// Karma configuration
// Generated on 2016-07-20

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      'jasmine'
    ],

    // list of files / patterns to load in the browser
    files: [
      'https://maps.googleapis.com/maps/api/js?sensor=false',
      // bower:js
      'app/bower_components/jquery/dist/jquery.js',
      'app/bower_components/angular/angular.js',
      'app/bower_components/bootstrap/dist/js/bootstrap.js',
      'app/bower_components/angular-animate/angular-animate.js',
      'app/bower_components/angular-cookies/angular-cookies.js',
      'app/bower_components/angular-resource/angular-resource.js',
      'app/bower_components/angular-sanitize/angular-sanitize.js',
      'app/bower_components/angular-touch/angular-touch.js',
      'app/bower_components/angular-ui-router/release/angular-ui-router.js',
      'app/bower_components/angular-simple-logger/dist/angular-simple-logger.js',
      'app/bower_components/lodash/lodash.js',
      'app/bower_components/markerclustererplus/src/markerclusterer.js',
      'app/bower_components/google-maps-utility-library-v3-markerwithlabel/dist/markerwithlabel.js',
      'app/bower_components/google-maps-utility-library-v3-infobox/dist/infobox.js',
      'app/bower_components/google-maps-utility-library-v3-keydragzoom/dist/keydragzoom.js',
      'app/bower_components/js-rich-marker/src/richmarker.js',
      'app/bower_components/angular-google-maps/dist/angular-google-maps.js',
      'app/bower_components/moment/moment.js',
      'app/bower_components/angular-moment/angular-moment.js',
      'app/bower_components/snapjs/snap.js',
      'app/bower_components/angular-snap/angular-snap.js',
      'app/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'app/bower_components/ngFuzzySearch/ngFuzzySearch.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      // endbower
      'app/scripts/**/*.js',
      'test/mock/**/*.js',
      'test/spec/**/*.js'
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'PhantomJS'
    ],

    // Which plugins to enable
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine'
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};