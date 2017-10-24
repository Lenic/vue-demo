import ajax from '$lib/utils/api-factory';

export default new ajax({
  url: v => `/api${v.url}`,
  optionParams: ['url'],
  params: {
    _: {
      defaultValue: () => Date.now(),
    },
  },
});
