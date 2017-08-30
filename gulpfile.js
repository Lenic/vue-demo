import zip from 'gulp-zip';
import rimraf from 'rimraf';
import shell from 'gulp-shell';
import gulp from 'gulp';
import _ from 'underscore';

import upload from './config/upload';
import { name, version } from './package.json';

const argv = require('minimist')(process.argv.slice(2))
  , suffix = argv.suffix || ''
  , suffixes = _.isArray(suffix) ? suffix : [suffix]
  , commitid = (argv.commitid || '').substr(0, 8)
  , branchSegments = (argv.branch || '').replace(/\//g, '-').split('-')
  , branch = _.difference(branchSegments, ['remotes', 'origin']).join('-')
  , filenameArray = [name, version].concat([branch, commitid]).concat(suffixes)
  , filename = `${_.filter(filenameArray, v => v).join('-')}.zip`
  , clearFn = cb => rimraf('dist', cb)
  , site = argv.site || 'nexus:8081';

const cmd = `node \
  -r babel-register \
  ./node_modules/.bin/webpack \
    --config ./config/webpack.config.prod.js \
`;

gulp.task('clear', clearFn);

gulp.task('pack', ['clear'], shell.task(cmd, { cwd: __dirname }));

gulp.task('local', ['clear'], () =>
  gulp.src('dist/**/*')
    .pipe(zip(filename))
    .pipe(gulp.dest(`dist/${name}.zip`))
)

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
