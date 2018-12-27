import ajax from '@lenic/api-factory';
import engine from '@lenic/api-factory/lib/xhrEngine';

import interceptors from './interceptors';

export default ajax({
  engine,
  interceptors,
  url: v => `/api${v.url}`,
  optionParams: ['url'],
  params: {
    _: {
      defaultValue: {
        get: () => Date.now()
      }
    }
  },
  headers: {
    delay: 2000
  }
});

export const debounce = 200;
