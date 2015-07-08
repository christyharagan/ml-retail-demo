var gulp = require('gulp');
var tasks = require('./dist/gulpfile.js')

gulp.task('build-schema', tasks.buildSchema)

gulp.task('build-database', tasks.buildDatabase)

gulp.task('clean-database', tasks.cleanDatabase)

gulp.task('test', tasks.test)
