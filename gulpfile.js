'use strict';

var gulp            = require( 'gulp' );
var browserSync     = require('browser-sync').create();
var sass            = require( 'gulp-sass' );
var postcss         = require( 'gulp-postcss' );
var autoprefixer    = require( 'autoprefixer' );

// Define paths to your scss, js and html files
var paths = {
    styles: {
        src: './assets/sass/**/*.scss',
        dest: './'
    },
    js: {
        src: './assets/js/*.js',
        dest: './assets/js/'
    },
    html: {
        src: [ './*.html' ]
    }
};

// Start browserSync
function browserSyncStart( cb ) {
    browserSync.init({
        server: {
            baseDir: './'
        }
    }, cb);
}

// Reloads the browser
function browserSyncReload( cb ) {
    browserSync.reload();
    cb();
}

// Compiles SASS into CSS
function sassCompile() {
    return gulp.src( paths.styles.src )
        .pipe( sass({
            indentType: 'tab',
            indentWidth: 1,
            outputStyle: 'expanded'
        } ).on( 'error', sass.logError) )
        .pipe( postcss([
            autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            })
        ]))
        .pipe( gulp.dest( paths.styles.dest ) )
        .pipe( browserSync.stream() );
}

// Watch for file changes
function watch() {
    gulp.watch( paths.styles.src, sassCompile );
    gulp.watch( [paths.js.src, paths.html.src], browserSyncReload );
}


// define series of tasks
var server = gulp.series( browserSyncStart, watch );

exports.browserSyncStart = browserSyncStart;
exports.browserSyncReload = browserSyncReload;
exports.sassCompile = sassCompile;
exports.watch = watch;
exports.server = server;
