/* eslint-disable no-invalid-this */

import axios from 'axios';
import _ from 'underscore';

import Deferred from './deferred';

const ajax = axios.create();

export class Descriptor {
  constructor(desc) {
    this._url = _.isFunction(desc.url) ? desc.url : () => desc.url;
    this._defaultParams = _.mapObject(desc.params, v => v.defaultValue);
    this._headers = desc.headers || {};
    this._optionParams = desc.optionParams;
    this._responseType = desc.responseType || 'json';
    this._contentType = `${desc.contentType || 'application/json'}; charset=UTF-8`;
  }

  makeParams(paramsFns) {
    return _.chain(paramsFns)
      .reduce((acc, v) => {
        const p = _.isFunction(v) ? v.call(acc) : v;
        return _.extend({}, acc, _.omit(p, value => _.isUndefined(value)));
      }, this._defaultParams)
      .mapObject((v, k, a) => _.isFunction(v) ? v.call(a) : v, this)
      .value();
  }

  makeRequest(method, params) {
    const data = _.omit.apply(_, [params].concat(this._optionParams))
      , useBody = method === 'POST' || method === 'PUT' || method === 'PATCH'
      , headers = _.extend({
        'Content-Type': this._contentType,
      }, this._headers);

    return _.extend({
      method,
      headers,
      cancelToken: null,
      url: this._url(params),
      responseType: this._responseType,
    }, useBody ? { data } : { params: data });
  }
}

export default (descriptor) => {
  const desc = new Descriptor(descriptor);

  return function () {
    const paramsFns = [].slice.call(arguments, 0)
      , exec = function (method, preFilter) {
        const params = desc.makeParams(paramsFns);
        let ajaxOption = desc.makeRequest(method, params);

        if (this._token) {
          this._token.cancel('Cancel ajax request.');
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
};
