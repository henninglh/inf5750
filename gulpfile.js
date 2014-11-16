var gulp = require('gulp'),
    connect = require('gulp-connect'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    jade = require('gulp-jade'),
    minifyCSS = require('gulp-minify-css'),
    karma = require('gulp-karma'),
    zip = require('gulp-zip'),
    del = require('del');

var testFiles = [
    'test/test-main-js'
];

/**
 * Our default task, starts the build server, to make sure all
 * required files are present, then starts the server and watch
 * tasks for development
 **/
gulp.task('default', ['build', 'server', 'watch']);

/**
 * Builds our source files into minified, rendered files,
 * ready for production
 **/
gulp.task('build', ['scripts', 'templates', 'styles', 'load']);

/**
 * Creates a web server for serving our files @ localhost:3000
 **/
gulp.task('server', function () {
    connect.server({
        root: 'dist',
        port: 3000,
        livereload: true
    });
});

/**
 * Watches our source files, and starts processing if any
 * changes occurs
 **/
gulp.task('watch', function () {
    gulp.watch('./src/css/*.css', ['styles']);
    gulp.watch('./src/js/**/*.js', ['scripts']);
    gulp.watch('./src/**/*.jade', ['templates']);
});

/**
 * Templates takes our source's .jade files and renders them in HTML
 * in the /dist& folder, ready for produciton
 **/
gulp.task('templates', function () {
    var YOUR_LOCALS = {};

    gulp.src('./src/views/*.jade')
        .pipe(jade({
            locals: YOUR_LOCALS
        }))
        .pipe(gulp.dest('./dist/views/'))
        .pipe(connect.reload());

    gulp.src('./src/index.jade')
        .pipe(jade({
            locals: YOUR_LOCALS
        }))
        .pipe(gulp.dest('./dist/'))
        .pipe(connect.reload());
});

/**
 * Scripts takes our source's .js files and uglifies them, and concatenate
 * them into a single app.min.js file, ready for production
 **/
gulp.task('scripts', function () {
    return gulp.src(['./src/js/app.js', './src/js/services/*.js', './src/js/controllers/*.js', './src/js/config/*.js'])
        .pipe(uglify())
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('dist/js/'))
        .pipe(connect.reload());
});

/**
 * Styles takes our source's .css files, concatenate them into a single file
 * before minifying it, making t ready for production.
 **/
gulp.task('styles', function () {
    return gulp.src('./src/css/*.css')
        .pipe(concat('style.min.css'))
        .pipe(minifyCSS({keepBreaks: true}))
        .pipe(gulp.dest('dist/css/'))
        .pipe(connect.reload());
});

/**
 * Load takes all our external dependencies, and add the minified versions
 * to our dist/ folder, making the deployed version independant of external
 * servers for these libraries(cdn)
 **/
gulp.task('load', function () {
    gulp.src('./bower_components/angular-mocks/angular-mocks.js*')
        .pipe(gulp.dest('./dist/js/'));
    gulp.src('./bower_components/**/*.min.js*')
        .pipe(gulp.dest('./dist/js/'));
    gulp.src('./bower_components/**/*.min.css')
        .pipe(gulp.dest('./dist/css/'));
    gulp.src('./bower_components/bootstrap/dist/fonts/*')
        .pipe(gulp.dest('./dist/css/bootstrap/dist/fonts/'));
    gulp.src('./manually_downloaded_components/FlaticonDownload/*')
        .pipe(gulp.dest('./dist/css/flaticon/'));
});

/**
 * Deploy makes the entire /dist/ folder into a zipped file, making it a complete,
 * reaady to install, DHIS 2 application.
 */
gulp.task('deploy', function () {
    return gulp.src(['dist', 'manifest.webapp'])
        .pipe(zip('ArchitectWirelessWebServices.zip'))
        .pipe(gulp.dest('dist'))
});

/**
 * Empties the dist folder for a total scrub
 */
gulp.task('clean', function() {
    return del('dist/*');
});

/**
 * Runs our tests with Karma test-runner
 **/
gulp.task('test', function () {
    return gulp.src(testFiles)
        .pipe(karma({
            configFile: 'karma.conf.js',
            action: 'run'
        }))
        .on('error', function (err) {
            console.log(err);
            this.emit('end');
        });
});
