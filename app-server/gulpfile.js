var gulp = require('gulp');
var tasks = require('./dist/gulpfile.js')

gulp.task('build-schema', tasks.buildSchema)
