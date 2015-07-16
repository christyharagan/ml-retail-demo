import * as gulp from 'gulp'
import * as project from 'ml-project'
import * as s from 'typescript-schema'
import * as m from 'ml-admin'
import {RetailDemo} from './lib/definition'
import * as u from 'ml-uservices'
import * as path from 'path'
var mocha = require('gulp-mocha')
var assign = require('lodash.assign')

////
import {Wirings, generateWiring, resolveWiring} from 'tschuss'
///

gulp.task('build-schema', buildSchema)

gulp.task('build-database', buildDatabase)

gulp.task('clean-database', cleanDatabase)

gulp.task('test', test)

let config = <project.Config>require('../../config.json')
let packageJson = require('../package.json')

export function buildSchema() {
  return gulp
    .src('lib/**/*.ts')
    .pipe(project.buildJson({
      definition: new RetailDemo(config),
      config: config,
      packageName: packageJson.name
    }))
    .pipe(gulp.dest('dist/json'))
}

export function buildDatabase() {
  let rawSchema = <s.RawSchema>(<s.RawSchema>require('./json/schema.json')).concat(require('../../common/dist/json/schema.json'), require('../../app-server/dist/json/schema.json'))
  /*let rawSchema = <s.RawSchema>assign(require('./json/schema.json'), require('../../common/dist/json/schema.json'))
  rawSchema = <s.RawSchema>assign(rawSchema, require('../../app-server/dist/json/schema.json'))*/

  return gulp
    .src(require('../tsconfig.json').files)
    .pipe(project.buildDatabase({
      base: path.join(process.cwd(), 'lib'),
      schema: rawSchema,
      config: config,
      packageName: packageJson.name,
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
  let rawSchema = <s.RawSchema>(<s.RawSchema>require('./json/schema.json')).concat(require('../../common/dist/json/schema.json'), require('../../app-server/dist/json/schema.json'))

//  let rawSchema = <s.RawSchema>assign(require('./json/schema.json'), require('../../common/dist/json/schema.json'))
//  rawSchema = <s.RawSchema>assign(rawSchema, require('../../app-server/dist/json/schema.json'))
  let schema = s.rawSchemaToSchema(rawSchema)

  console.log(Object.keys(schema))

  /*let gw = generateWiring(schema)
  console.log(gw)
  let wirings = resolveWiring(gw)
  console.log(wirings)*/

//  return gulp.src('./dist/tests/**/*.js', { read: false })
//    .pipe(mocha());
}
