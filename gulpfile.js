import zip from 'gulp-zip';
import rimraf from 'rimraf';
import shell from 'gulp-shell';
import gulp from 'gulp';

import upload from './config/upload';
import { name, version } from './package.json';

const clearFn = cb => rimraf('dist', cb);
const filename = `${name}-${version}.zip`;
const cmd = `node \
  -r babel-register \
  ./node_modules/.bin/webpack \
    --progress \
    --config ./config/webpack.config.prod.js \
`;

gulp.task('clear', clearFn);

gulp.task('pack', ['clear'], shell.task(cmd, { cwd: __dirname }));

gulp.task('upload', ['pack'], cb => {
  gulp.src('dist/**/*')
    .pipe(zip(filename))
    .pipe(upload({
      url: `http://nexus.me/repository/nas/${name}/${filename}`,
      auth: 'admin:admin123',
      callback: cb
    }));
});

gulp.task('default', ['upload'], clearFn);
