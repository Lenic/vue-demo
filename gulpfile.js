import gulp from 'gulp';
import _ from 'underscore';
import tar from 'gulp-tar';
import rimraf from 'rimraf';
import gzip from 'gulp-gzip';
import shell from 'gulp-shell';

import upload from './config/upload';
import { name, version } from './package.json';

const argv = require('minimist')(process.argv.slice(2))
  , suffix = argv.suffix || ''
  , suffixes = _.isArray(suffix) ? suffix : [suffix]
  , commitid = (argv.commitid || '').substr(0, 8)
  , branch = (argv.branch || '').replace(/\//g, '-')
  , ignoreBranchSegments = ['remotes', 'origin']
  , branchNames = _.filter(branch.split('-'), v => !_.contains(ignoreBranchSegments, v))
  , filenameArray = [name, version].concat(branchNames).concat(suffixes).concat(commitid)
  , filename = `${_.filter(filenameArray, v => v).join('-')}.tar`
  , clearFn = cb => rimraf('dist', cb)
  , isProduction = process.env.NODE_ENV === 'production'
  , site = argv.site || 'store.helianshare.com';

const cmd = `node \
  -r babel-register \
  ./node_modules/webpack/bin/webpack \
    --hide-modules \
    --config ./config/webpack.config${isProduction ? '.prod' : '.dev'}.js \
`;

gulp.task('clear', clearFn);

gulp.task('pack', ['clear'], shell.task(cmd, { cwd: __dirname }));

gulp.task('upload', ['pack'], cb => {
  gulp.src('dist/**/*')
    .pipe(tar(filename))
    .pipe(gzip())
    .pipe(upload({
      url: `http://${site}/repository/nas/${name}/${filename}.gz`,
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
