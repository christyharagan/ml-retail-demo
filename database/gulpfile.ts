import * as gulp from 'gulp'
import * as project from 'ml-project'
import * as s from 'typescript-schema'
import * as m from 'ml-admin'
import {RetailDemo} from './lib/definition'
import * as u from 'ml-uservices'
import * as path from 'path'
var mocha = require('gulp-mocha')

gulp.task('build-schema', buildSchema)

gulp.task('build-database', buildDatabase)

gulp.task('clean-database', cleanDatabase)

gulp.task('test', test)

let config = <project.Config>require('../../config.json')

export function buildSchema() {
  return gulp
    .src('lib/**/*.ts')
    .pipe(project.buildJson({
      definition: new RetailDemo(config),
      config: config
    }))
    .pipe(gulp.dest('dist/json'))
}

export function buildDatabase() {
  return gulp
    .src(require('../tsconfig.json').files)
    .pipe(project.buildDatabase({
      base: path.join(process.cwd(), 'lib'),
      schema: <s.RawSchema>require('./json/schema.json'),
      config: config,
      model: <m.Model>require('./json/database-model.json')
    }))
    .pipe(gulp.dest('dist'))
}

export function cleanDatabase() {
  return gulp
    .src(require('../tsconfig.json').files)
    .pipe(project.cleanDatabase({
      base: path.join(process.cwd(), 'lib'),
      schema: <s.RawSchema>require('./json/schema.json'),
      config: config,
      model: <m.Model>require('./json/database-model.json')
    }))
    .pipe(gulp.dest('dist'))
}

export function test() {
  return gulp.src('./dist/tests/**/*.js', { read: false })
    .pipe(mocha());
}
