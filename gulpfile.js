import zip from 'gulp-zip';
import rimraf from 'rimraf';
import shell from 'gulp-shell';
import gulp from 'gulp';

import upload from './config/upload';
import { name, version } from './package.json';

const argv = require('minimist')(process.argv.slice(2))
  , filename = `${name}-${version}.zip`
  , clearFn = cb => rimraf('dist', cb)
  , site = argv.site || 'nexus.me';

const cmd = `node \
  -r babel-register \
  ./node_modules/.bin/webpack \
    --config ./config/webpack.config.prod.js \
`;

gulp.task('clear', clearFn);

gulp.task('pack', ['clear'], shell.task(cmd, { cwd: __dirname }));

gulp.task('upload', ['pack'], cb => {
  gulp.src('dist/**/*')
    .pipe(zip(filename))
    .pipe(upload({
      url: `http://${site}/repository/nas/${name}/${filename}`,
      auth: 'admin:admin123',
      callback: err => {
        if (err) {
          throw new Error('upload error.');
        } else {
          cb();
        }
      },
    }));
});

gulp.task('default', ['upload'], clearFn);
