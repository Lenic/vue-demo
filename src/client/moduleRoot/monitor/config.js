import ajax from '$lib/utils/api-factory';

export default new ajax({
  url: v => `/api/monitor${v.url}`,
  optionParams: ['url'],
  params: {
    _: {
      defaultValue: () => Date.now(),
    },
  },
});

export const FETCH_DATA = 'monitor.fetch-data';
export const TOGGLE_LOADING = 'monitor.toggle-loading';
