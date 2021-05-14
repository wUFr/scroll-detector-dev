const { min } = require('bn.js');
const mix = require('laravel-mix');

mix.ts("./ts/scrollDetector.ts",      "./dist/js/scrollDetector.js")
mix.ts("./ts/scrollDetector.init.ts", "./dist/js/scrollDetector.init.js")


// STYLES
mix.less('./less/scrollDetector.less',     './dist/css/scrollDetector.css')
mix.less('./less/scrollDetector.demo.less','./dist/css/scrollDetector.demo.css')