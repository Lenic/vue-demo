import urllib from 'urllib';
import through from 'through2';

export default (options = {}) => {
  var callback = options.callback || function () { };

  return through.obj(function (file, enc, cb) {
    // debugger
    file._contents.on('data', chunk => {
      urllib.request(options.url, {
        method: 'PUT',
        auth: options.auth,
        content: chunk,
      }, (err, data, res) => {
        try {
          callback(err, data, res);
        } finally {
          cb();
        }
      });
    });
    file._contents.on('error', cb);
  });
};
