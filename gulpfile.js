'use strict';

// ---------------------------------------
// Require Gulp & Plugins
// ---------------------------------------

var browserSync = require('browser-sync');
var reload = browserSync.reload;
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({
  pattern: [
    'gulp-*',
    'gulp.*',
    'lost',
    'cssnano',
    'autoprefixer',
    'rucksack-css',
    'postcss-vertical-rhythm'
  ],
  rename: {
    'rucksack-css': 'rucksack',
    'postcss-vertical-rhythm': 'vr'
  },
  lazy: false
});

// ---------------------------------------
// Import Tasks
// ---------------------------------------

function getTask(task) {
  return require('./gulp-tasks/' + task)(gulp, plugins);
}
gulp.task('style', getTask('style'));
gulp.task('scripts', getTask('scripts'));
gulp.task('jshint', getTask('jshint'));
gulp.task('libscripts', getTask('libscripts'));



// ---------------------------------------
// Task Running & BrowserSync
// ---------------------------------------

gulp.task('default', ['style', 'scripts', 'jshint', 'libscripts'], function () {
  var config = {
    notify: false,
    port: 8080,
    server: {
      baseDir: '.'
    },
    startPath: './index.html'
  };

  browserSync.init([
    'dist/**/*.css',
    'dist/**/*.js',
    'dist/**/*.html',
    'src/imgs/**/*'
  ], config);

  gulp.watch('dev/js/**/*.js', ['scripts']);
  gulp.watch('dev/scss/**/*.{sass,scss}', ['style']);

});
