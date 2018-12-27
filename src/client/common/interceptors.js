import { MessageBox } from 'element-ui';

import auth, { authInfo } from './auth';

// 永不会响应的结果
const ejection = new Promise(() => {});

const request = [
  {
    filter: () => true,
    fn: (next, ajaxOption) => {
      ajaxOption.headers.uid = authInfo.uid;
      ajaxOption.headers.token = authInfo.token;

      return next();
    }
  }
];

const response = [
  {
    filter: v => v.code >= 500,
    fn: () => {
      MessageBox.alert(
        '我们遇到了网络问题，请检查您的网络。如果确认没有问题，请联系我们的工作人员。',
        '网络异常'
      );

      return ejection;
    }
  },
  {
    filter: v => v.code === 0,
    fn: () => ejection
  },
  {
    filter: v => v.code > 0 && v.code < 500,
    fn: (n, res, ajaxOption, opts) => {
      if (res.code === 405 || res.data.code === 401) {
        auth.setAuth();

        return ejection;
      }

      if (opts && opts.callback) {
        return opts.callback(res, ejection);
      }

      if (!res.data.code) {
        return res.data.result;
      }

      MessageBox.alert(res.data.errorMsg || '--', '请求异常');

      if (opts && opts.continue) {
        return Promise.reject(res.data);
      } else {
        return ejection;
      }
    }
  }
];

export default { request, response };
