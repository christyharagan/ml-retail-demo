var gulp = require('gulp');
var tasks = require('./dist/gulpfile.js')

gulp.task('build', tasks.build)
gulp.task('copy-www', tasks.copyWWW)
gulp.task('watch-js', tasks.watchJS)
