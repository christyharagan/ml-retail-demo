import * as gulp from 'gulp'
import * as project from 'ml-project'
import * as s from 'typescript-schema'

gulp.task('build-schema', buildSchema)

let config = <project.Config>require('../../config.json')
let packageJson = require('../package.json')

export function buildSchema() {
  return gulp
    .src('lib/**/*.ts')
    .pipe(project.buildJson({
      config: config,
      packageName: packageJson.name
    }))
    .pipe(gulp.dest('dist/json'))
}
