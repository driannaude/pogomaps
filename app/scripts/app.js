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
    'ngFuzzySearch',
    'geolocation',
    'ngStorage',
    'angular.filter',
    'uiSwitch'
  ]).config(function($urlRouterProvider, $stateProvider, uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyDSdEhxozcqjVzZLQ3fi5BfgtfMsBPIBAw',
      v: '3.23', //defaults to latest 3.X anyhow
      libraries: 'weather,geometry,visualization'
    });
    $stateProvider.state('main', {
      url: '/',
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    });
    $urlRouterProvider.otherwise('/');
  }).run(function($rootScope, $interval, $http) {
    $rootScope.serverStats = null;
    $http.get('https://go.jooas.com/status').then(function(res) {
      var status = res.data;
      if(status !== $rootScope.serverStats){
          $rootScope.serverStats = status;
          $rootScope.$broadcast('server:statusChange' , status);
      } else {
        $rootScope.serversAreDown = status;
      }
      _startPolling();
    }, function(err) {
      console.error(err);
    });
    function _startPolling() {
      $interval(function() {
        $http.get('https://go.jooas.com/status').then(function(res) {
          var status = res.data;
          if(status !== $rootScope.serverStats){
              $rootScope.serverStats = status;
              $rootScope.$broadcast('server:statusChange' , status);
          } else {
            $rootScope.serversAreDown = status;
          }
        }, function(err) {
          console.error(err);
        });
      }, 60000);
    }
  });
