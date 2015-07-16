var gulp = require('gulp');
var project = require('ml-project');
gulp.task('build-schema', buildSchema);
var config = require('../../config.json');
var packageJson = require('../package.json');
function buildSchema() {
    return gulp
        .src('lib/**/*.ts')
        .pipe(project.buildJson({
        config: config,
        packageName: packageJson.name
    }))
        .pipe(gulp.dest('dist/json'));
}
exports.buildSchema = buildSchema;
//# sourceMappingURL=gulpfile.js.map