'use strict';

var gulp = require('gulp'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    merge = require('merge-stream'),
    concat = require('gulp-concat'),
    nano = require('gulp-cssnano'),
    rimraf = require('gulp-rimraf'),
    ignore = require('gulp-ignore');

function buildJs() {
	return browserify({entries: ['app/app.jsx', 'app/data-init.js'], extensions: ['.jsx'], debug: true})
        .transform('babelify', {presets: ['es2015', 'react']})
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('dist'));
}

function buildMinJs() {
	return gulp.src('./dist/bundle.js')
				.pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/'))
}

function buildCss() {
	var sassStream,
      cssStream;

  //compile sass
  sassStream = gulp.src('./app/**/*.scss')
    .pipe(sass({errLogToConsole: true}));

  //select additional css files
  // cssStream = gulp.src('./lib/*.css');

  //merge the two streams and concatenate their contents into a single file
  return merge(sassStream)
      .pipe(concat('main.css'))
      .pipe(gulp.dest('./dist/style/'));
}

function buildMinCss() {
	return gulp.src('./dist/style/main.css')
        .pipe(nano())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('./dist/style/'))
}

function watchJs() {
	gulp.watch(['./app/**/*.js', './app/**/*.jsx'], ['build-js']);
}

function watchCss() {
	gulp.watch('./app/**/*.scss', ['build-css']);
}

function cleanDist() {
	return gulp.src(['./dist/style/main.css', './dist/bundle.js'], { read: false }) 
   			.pipe(rimraf());
}

gulp.task('build-js', buildJs);
gulp.task('build-min-js', ['build-js'], buildMinJs);
gulp.task('watch-js', ['build-js'], watchJs);
gulp.task('build-css', buildCss);
gulp.task('watch-css', ['build-css'], watchCss);
gulp.task('build-min-css', ['build-css'], buildMinCss);
gulp.task('clean', ['build-min-css', 'build-min-js'], cleanDist);

gulp.task('default', ['watch-css']);
gulp.task('watch-all', ['watch-js', 'watch-css']);
gulp.task('build-dev', ['build-css', 'build-js']);
gulp.task('build-prod', ['build-css', 'build-min-css', 'build-js', 'build-min-js', 'clean']);


