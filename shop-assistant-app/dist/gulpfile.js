var gulp = require('gulp');
var ml_project_1 = require('ml-project');
function build() {
    return gulp
        .src('dist/lib/index.js')
        .pipe(ml_project_1.buildClient({ www: gulp.src('www/**/*') }))
        .pipe(gulp.dest('dist/www'));
}
exports.build = build;
function copyWWW() {
    return gulp.src('www/**/*').pipe(gulp.dest('dist/www'));
}
exports.copyWWW = copyWWW;
function watchJS() {
    return gulp
        .src('dist/lib/index.js')
        .pipe(ml_project_1.buildClient({ watch: true }))
        .pipe(gulp.dest('dist/www'));
}
exports.watchJS = watchJS;
gulp.task('build', build);
gulp.task('copy-www', copyWWW);
gulp.task('watch-js', watchJS);
//# sourceMappingURL=gulpfile.js.map