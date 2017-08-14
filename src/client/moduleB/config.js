import ajax from '$lib/utils/api-factory';

export default new ajax({
  url: v => `http://localhost:3000/api${v.url}`,
  optionParams: ['url'],
});
