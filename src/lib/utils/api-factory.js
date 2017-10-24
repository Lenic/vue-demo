/* eslint-disable no-invalid-this */

import axios from 'axios';
import _ from 'underscore';

import Deferred from './deferred';

const ejection = {}
  , ajax = axios.create();

export function setup(callback) {
  _.isFunction(callback) && callback(ajax, ejection);
}

export class Descriptor {
  constructor(desc) {
    this._headers = desc.headers || {};
    this._optionParams = desc.optionParams || [];
    this._responseType = desc.responseType || 'json';
    this._url = _.isFunction(desc.url) ? desc.url : () => desc.url;
    this._defaultParams = _.mapObject(desc.params || {}, v => v.defaultValue);
    this._contentType = `${desc.contentType || 'application/json'}; charset=UTF-8`;
  }

  convertParams(target) {
    if (!target) {
      return target;
    }

    if (typeof target === 'string') {
      return { url: target };
    }

    const defaultParmas = _.mapObject(
      _.extend({}, this._defaultParams),
      (v, k, o) => _.isFunction(v) ? v.call(o) : v,
    );

    return _.reduce(target, (acc, v, k, obj) => {
      acc[k] = _.isFunction(v) ? v.call(obj) : v;

      return acc;
    }, defaultParmas);
  }

  convertBody(target) {
    if (!target) {
      return target;
    }

    let obj = target;
    if (_.isFunction(target)) {
      obj = target();
    }

    if (typeof obj === 'string') {
      return obj;
    }

    return _.reduce(obj, (acc, v, k, o) => {
      acc[k] = _.isFunction(v) ? v.call(o) : v;

      return acc;
    }, {});
  }

  makeRequest(method, query, body, opts) {
    const params = this.convertParams(query)
      , currentParams = _.omit.apply(_, [params].concat(this._optionParams))
      , headers = _.extend({ 'Content-Type': this._contentType }, this._headers);

    const ajaxOptions = {
      method,
      headers,
      cancelToken: null,
      params: currentParams,
      url: this._url(params || {}),
      data: this.convertBody(body),
      responseType: this._responseType,
    };

    ajaxOptions.transformResponse = [function (data) {
      data.$params = ajaxOptions;
      data.$opts = opts;

      return data;
    }];

    return ajaxOptions;
  }
}

export default (descriptor) => {
  const desc = new Descriptor(descriptor);

  return function () {
    const query = arguments[0]
      , data = arguments[1]
      , opts = arguments[2];

    const exec = function (method, preFilter) {
      const params = desc.convertParams(query)
        , body = desc.convertBody(data);

      const ajaxOption = desc.makeRequest(method, params, body, opts);

      if (this._token) {
        this._token.cancel('Cancel ajax request.');
        this._token = null;
      }
      this._token = axios.CancelToken.source();

      if (_.isFunction(preFilter) && preFilter.length === 1) {
        preFilter(ajaxOption);
      }
      ajaxOption.cancelToken = this._token.token;

      const deferred = Deferred();
      ajax(ajaxOption)
        .then(v => {
          this._token = null;

          if (v !== ejection) {
            deferred.resolve(v.data, params);
          }
        })
        .catch(err => {
          if (!axios.isCancel(err)) {
            this._token = null;

            if (err !== ejection) {
              deferred.reject(err, params);
            }
          }
        });

      return deferred.promise;
    };

    const obj = {};

    obj.fetch = preFilter => exec.call(obj, 'GET', preFilter);
    obj.post = preFilter => exec.call(obj, 'POST', preFilter);
    obj.put = preFilter => exec.call(obj, 'PUT', preFilter);
    obj.del = preFilter => exec.call(obj, 'DELETE', preFilter);

    return obj;
  };
};
