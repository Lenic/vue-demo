import axios from 'axios';
import _ from 'underscore';

import Deferred from './deferred';

const ajax = axios.create();

export class Descriptor {
  constructor(desc) {
    this._url = _.isFunction(desc.url) ? desc.url : function () { return desc.url };
    this._paramsValidator = _.chain(desc.params)
      .omit(v => !_.isFunction(v.validate))
      .mapObject(v => v.validate)
      .value();
    this._defaultParams = _.mapObject(desc.params, v => v.defaultValue);
    this._headers = desc.headers || {};
    this._optionParams = desc.optionParams;
    this._responseType = desc.responseType || 'json';
    this._contentType = `${desc.contentType || 'application/json'}; charset=UTF-8`;
  }

  makeParams(paramsFns) {
    return _.chain(paramsFns)
      .reduce((acc, v) => {
        let p = _.isFunction(v) ? v.call(acc) : v;
        return _.extend({}, acc, _.omit(p, value => _.isUndefined(value)));
      }, this._defaultParams)
      .mapObject((v, k, a) => _.isFunction(v) ? v.call(a) : v, this)
      .value();
  }

  makeRequest(method, params) {
    const data = _.omit.apply(_, [params].concat(this._optionParams))
      , headers = _.extend({
        'Content-Type': this._contentType
      }, this._headers);

    return {
      params: data,
      method,
      headers,
      cancelToken: null,
      url: this._url(params),
      responseType: this._responseType,
    };
  }
}

export default (descriptor) => {
  let desc = new Descriptor(descriptor);

  return function () {
    const paramsFns = [].slice.call(arguments, 0)
      , exec = function (method, preFilter) {
        let params = desc.makeParams(paramsFns)
          , ajaxOption = desc.makeRequest(method, params);

        if (this._token) {
          this._token.cancel('Cancel ajax request.')
          this._token = null;
        }
        this._token = axios.CancelToken.source();

        if (preFilter) {
          ajaxOption = preFilter(ajaxOption);
        }
        ajaxOption.cancelToken = this._token.token;

        const deferred = Deferred();
        ajax(ajaxOption)
          .then(v => {
            this._token = null;

            deferred.resolve(v.data, params);
          })
          .then(null, err => {
            if (!axios.isCancel(err)) {
              this._token = null;

              deferred.reject(err, params);
            }
          });

        return deferred.promise;
      };

    return {
      fetch(preFilter) {
        return exec.call(this, 'GET', preFilter);
      },
      post(preFilter) {
        return exec.call(this, 'POST', preFilter);
      },
      put(preFilter) {
        return exec.call(this, 'PUT', preFilter);
      },
      del(preFilter) {
        return exec.call(this, 'DELETE', preFilter);
      },
    };
  };
}
