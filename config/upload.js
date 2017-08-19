import through from 'through2';
import urllib from 'urllib'

export default (options = {}) => {
  var callback = options.callback || function () { };

  return through.obj(function (file, enc, cb) {
    urllib.request(options.url, {
      method: 'PUT',
      auth: options.auth,
      content: file._contents,
    }, (err, data, res) => {
      debugger
      try {
        callback(err, data, res);
      } finally {
        cb();
      }
    });
  });
};
