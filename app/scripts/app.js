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
    'nemLogging',
    'ui-leaflet',
    'angularMoment',
    'snap',
    'ui.bootstrap',
    'ngFuzzySearch',
    'ngStorage',
    'angular.filter',
    'uiSwitch',
    'ng-mfb',
    'ngGeolocation'
  ]).config(function($urlRouterProvider, $stateProvider) {

    $stateProvider.state('main', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .state('thanks', {
        url: '/thankyou',
        templateUrl: 'views/thankyou.html',
        controller: 'ThankYouCtrl'
      });
    $urlRouterProvider.otherwise('/');
  }).run(function($rootScope) {
    // Detect adblockers
    $rootScope.hasAdblocker = false;

    var adDetector = new BlockAdBlock({
      checkOnLoad: true,
      resetOnEnd: true
    });
    adDetector.on(true, function(){
      $rootScope.hasAdblocker = true;
      $rootScope.$broadcast('adblock:state', $rootScope.hasAdblocker);
    });
    $rootScope.$broadcast('adblock:state', $rootScope.hasAdblocker);
    $rootScope.serverStats = null;

    var adsLoaded = false;
    $rootScope.$on('$viewContentLoaded', function() {
      if (!adsLoaded) {
        try {
          // jshint ignore:start
          (adsbygoogle = window.adsbygoogle || []).push({
            google_ad_client: 'ca-pub-2131940670944575',
            enable_page_level_ads: true
          });
          adsLoaded = true;
          //jshint ignore:end
        } catch (e) {
          console.error('Could Not Load Adsense');
          console.error(e);
        }
      }
    });

  })
  .directive('script', function() {
    // jshint ignore:start
    return {
      restrict: 'E',
      scope: false,
      link: function(scope, elem, attr) {
        if (attr.type === 'text/javascript-lazy') {
          var code = elem.text();
          var f = new Function(code);
          f();
        }
      }
    };
    // jshint ignore:end
  }).directive('googleAdsense', function($timeout) {
    return {
      restrict: 'AE',
      transclude: true,
      replace: true,
      template: '<div ng-transclude></div>',
      link: function() {
        $timeout(function() {
          //jshint ignore:start
          try {
            (adsbygoogle = window.adsbygoogle || []).push({});
          } catch (ex) {
            console.warn(ex);
          }
          //jshint ignore:end
        }, 0);
      }
    };
  });
