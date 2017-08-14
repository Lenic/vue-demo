const EmptyFunction = function () { };

module.exports = function deferred() {
  var promise = {
    resolve: EmptyFunction,
    reject: EmptyFunction,
    promise: null,
  };

  var innerPromise = new Promise((resolve, reject) => {
    promise.resolve = resolve;
    promise.reject = reject;
  });

  promise.promise = innerPromise;

  return promise;
}
