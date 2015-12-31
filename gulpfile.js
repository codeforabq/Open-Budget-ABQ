var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('build-js', function () {
  return browserify({entries: ['app/app.jsx', 'app/data-init.js'], extensions: ['.jsx'], debug: true})
      .transform('babelify', {presets: ['es2015', 'react']})
      .bundle()
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('dist'));
});

gulp.task('watch-js', ['build-js'], function () {
    gulp.watch('*.jsx', ['build-js']);
});

gulp.task('default', ['watch-js']);