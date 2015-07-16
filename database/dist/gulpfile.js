var gulp = require('gulp');
var project = require('ml-project');
var s = require('typescript-schema');
var definition_1 = require('./lib/definition');
var path = require('path');
var mocha = require('gulp-mocha');
var assign = require('lodash.assign');
gulp.task('build-schema', buildSchema);
gulp.task('build-database', buildDatabase);
gulp.task('clean-database', cleanDatabase);
gulp.task('test', test);
var config = require('../../config.json');
var packageJson = require('../package.json');
function buildSchema() {
    return gulp
        .src('lib/**/*.ts')
        .pipe(project.buildJson({
        definition: new definition_1.RetailDemo(config),
        config: config,
        packageName: packageJson.name
    }))
        .pipe(gulp.dest('dist/json'));
}
exports.buildSchema = buildSchema;
function buildDatabase() {
    var rawSchema = require('./json/schema.json').concat(require('../../common/dist/json/schema.json'), require('../../app-server/dist/json/schema.json'));
    return gulp
        .src(require('../tsconfig.json').files)
        .pipe(project.buildDatabase({
        base: path.join(process.cwd(), 'lib'),
        schema: rawSchema,
        config: config,
        packageName: packageJson.name,
        model: require('./json/database-model.json')
    }))
        .pipe(gulp.dest('dist'));
}
exports.buildDatabase = buildDatabase;
function cleanDatabase() {
    return gulp
        .src(require('../tsconfig.json').files)
        .pipe(project.cleanDatabase({
        base: path.join(process.cwd(), 'lib'),
        schema: require('./json/schema.json'),
        config: config,
        model: require('./json/database-model.json')
    }))
        .pipe(gulp.dest('dist'));
}
exports.cleanDatabase = cleanDatabase;
function test() {
    var rawSchema = require('./json/schema.json').concat(require('../../common/dist/json/schema.json'), require('../../app-server/dist/json/schema.json'));
    var schema = s.rawSchemaToSchema(rawSchema);
    console.log(Object.keys(schema));
}
exports.test = test;
//# sourceMappingURL=gulpfile.js.map