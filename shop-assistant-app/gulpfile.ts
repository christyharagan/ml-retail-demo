import * as gulp from 'gulp'
import {buildClient as doBuildClient} from 'ml-project'

export function build() {
  return gulp
    .src('dist/lib/index.js')
    .pipe(doBuildClient({www: gulp.src('www/**/*')}))
    .pipe(gulp.dest('dist/www'))
}

export function copyWWW() {
  return gulp.src('www/**/*').pipe(gulp.dest('dist/www'))
}

export function watchJS() {
  return gulp
    .src('dist/lib/index.js')
    .pipe(doBuildClient({watch: true}))
    .pipe(gulp.dest('dist/www'))
}

gulp.task('build', build)
gulp.task('copy-www', copyWWW)
gulp.task('watch-js', watchJS)
