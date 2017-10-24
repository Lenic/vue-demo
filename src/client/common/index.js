import ajax from '$lib/utils/api-factory';
import debounce from '$lib/utils/debounce-function';

export const AJAX_DATE_FORMAT = 'YYYYMMDD';
export const HIGHCHARTS_FORMAT = 'YYYY-MM-DD';
export const ELEMENT_DATE_FORMAT = 'YYYY-MM-DDTHH:mm:ss.000[Z]';

const container = {};
const HOSPITALS = 'HOSPITAL_LIST';

const request = new ajax({
  url: v => `/api${v.url}`,
  optionParams: ['url'],
});

// 防止密集调用的延迟封装：延迟 100ms，但是这段时间内大于等于 10 次调用后立即触发。
const fetchHospitalsFn = debounce(request({ url: '/user/station' }).fetch, 30, 10);

export const fetchHospitals = () => {
  if (container[HOSPITALS] !== undefined) {
    return Promise.resolve(container[HOSPITALS]);
  } else {
    return fetchHospitalsFn().then(v => container[HOSPITALS] = v);
  }
};
