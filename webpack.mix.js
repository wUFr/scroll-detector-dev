const mix = require('laravel-mix');

//mix.js("./dist/ScrollDetector.init.js", "./docs/ScrollDetector.min.js")

// STYLES
mix.less('./less/scrollDetector.less',     './css/scrollDetector.min.css')
mix.less('./less/scrollDetector.demo.less','./css/scrollDetector.demo.css')

// COPY INTO DOCS FOLDER FOR GITHUB PAGES STYLES
mix.copy('./css/scrollDetector.min.css',  './docs/scrollDetector.min.css')
mix.copy('./css/scrollDetector.demo.css', './docs/scrollDetector.demo.css')


// COPY INTO DIST PACKAGE
mix.copy('./css/scrollDetector.min.css',  './dist/css/scrollDetector.min.css')
mix.copy('./css/scrollDetector.demo.css', './dist/css/scrollDetector.demo.css')
