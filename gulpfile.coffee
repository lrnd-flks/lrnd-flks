gulp = require ('gulp')
coffee = require ('gulp-coffee')
jade = require ('gulp-jade')
stylus = require ('gulp-stylus')
yaml = require ('gulp-yaml')

gulp.task 'default', ['coffee', 'jade', 'styl', 'yaml']

gulp.task 'watch',
    ->
        gulp.watch './src/**', ['default']

gulp.task 'coffee_gulpfile',
    ->
        gulp.src './gulpfile.coffee'
        .pipe coffee {bare: true}
        .pipe gulp.dest './'

gulp.task 'jade',
    ->
        gulp.src './src/**/*.jade'
        .pipe jade {pretty: true}
        .pipe gulp.dest './build'

gulp.task 'coffee',
    ->
        gulp.src './src/**/*.coffee'
        .pipe coffee {bare: true}
        .pipe gulp.dest './build'

gulp.task 'styl',
    ->
        gulp.src './src/**/*.styl'
        .pipe stylus {}
        .pipe gulp.dest './build'

gulp.task 'yaml',
    ->
        gulp.src './src/**/*.yml'
        .pipe yaml { space: 4 }
        .pipe gulp.dest './build'