// ---------------------------------------
// Watch Task
// ---------------------------------------
// It is running Browser Sync, & watching scss, js, & html files for changes.

'use strict';

module.exports = function(gulp, plugins) {
  return function() {
    plugins.browserSync.init({
      notify: false,
      port: 8080,
      server: {
        baseDir: './dist'
      }
    });
    gulp.watch([
      'dist/*.html',
      'dist/js/**/*.js',
      'dist/img/**/*'
    ]).on('change', reload);

    gulp.watch('dist/css/**/*.scss', ['styles']);
  };
};
