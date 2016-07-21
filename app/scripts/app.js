'use strict';

/**
 * @ngdoc overview
 * @name ngApp
 * @description
 * # ngApp
 *
 * Main module of the application.
 */
angular
  .module('ngApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'uiGmapgoogle-maps',
    'angularMoment',
    'snap',
    'ui.bootstrap',
    'ngFuzzySearch'
  ]).config(function($urlRouterProvider, $stateProvider, uiGmapGoogleMapApiProvider){
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyB1xmk0SgauBGotpGglRs6DOohSzN2DGUw',
        v: '3.23', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
    $stateProvider.state('main', {
      url: '/',
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    });
    $urlRouterProvider.otherwise('/');
  });
