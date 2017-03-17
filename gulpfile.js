/**
 * Gulp file for dev purpose do not edit.
 */

const gulp = require('gulp');
const concat = require('gulp-concat');

/**
 * The variable who define the paths
 * @constant
 */
const path = {
    base: 'src/Base/**/*.js',
    config: 'src/Config/**/*.js',
    system: 'src/System/**/*.js'
};

/**
 * the gulp task who concatenate the base classes of Zephir engine.
 * @task base
 */
gulp.task('base', function () {
    return gulp.src(path.base).pipe(concat('ZephirBase.js')).pipe(gulp.dest('bin'));
});
