import Deferred from './deferred';

/**
 * 封装 fn 并返回一个封装后的函数，这个新的函数会延迟执行 fn，
 * 并将延迟期间所有的调用的参数作为一个数组传递进去。
 * @param {Function} fn 待执行的目标函数
 * @param {Integer} millisec 函数 fn 延迟执行的毫秒数
 * @param {Integer} threshold 函数 fn 所允许的最大参数数量
 */
export default function (fn, millisec, threshold) {
  if (typeof fn !== 'function') {
    throw new TypeError('fn must be function type.');
  }
  if (!(typeof millisec === 'number' && isFinite(millisec) && Math.floor(millisec) === millisec && millisec > 0)) {
    throw new TypeError('The millisec must be a positive integer.');
  }
  if (!(typeof threshold === 'number' && isFinite(threshold) && Math.floor(threshold) === threshold && threshold > 0)) {
    throw new TypeError('The threshold must be a positive integer.');
  }

  // 记录当前延迟任务的标识：null 表示没有任务
  let token = null;
  // 待执行的多次请求参数的数组
  let parameters = [];
  // 待连接的延迟对象数组
  let promises = [];

  return function () {
    // 在规定的时间内多次调用，取消前一次的等待效果
    if (token !== null) {
      clearTimeout(token);

      token = null;
    }

    // 缓存本次调用的参数
    for (var i = 0; i < arguments.length; i++) {
      parameters.push(arguments[i]);
    }

    // 定义本次调用的返回值
    var defer = Deferred();

    // 保存本次的延迟对象，使得后续连接可用
    promises.push(defer);

    // 需要执行的延迟函数封装
    var callback = function () {
      // 本次延迟已正确执行，取消延迟函数标识
      token = null;

      const tmpParameters = parameters;
      parameters = [];

      const tmpPromises = promises;
      promises = [];

      // 执行目标函数并捕获返回值
      var delay = Promise.resolve().then(function () {
        return fn(tmpParameters);
      });

      // 触发请求的数据回调
      tmpPromises.forEach(function (v) {
        delay.then(v.resolve, v.reject).then(null, function (e) {
          console.error(e);
        });
      });
    };

    // 参数数量达到阈值限制时，取消延迟直接执行
    if (parameters.length >= threshold) {
      callback();
    } else {
      token = setTimeout(callback, millisec);
    }

    // 保持本次请求后续操作的延迟对象
    return defer.promise;
  };
}
