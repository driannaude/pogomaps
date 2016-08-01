'use strict';
/**
 * @ngdoc function
 * @name ngApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngApp
 */
angular.module('ngApp')
  .controller('NavCtrl', function($rootScope, $scope, $http, $q, geolocation, $timeout, $localStorage, uiGmapGoogleMapApi) {
    $localStorage.geoTimeout = 0;
    // Do server status things
    $scope.serversAreDown = false;
    $scope.geoLocationError = false;
    $scope.serverStatus = 'CHECKING...';
    $scope.onlineCount = 0;
    $scope.$on('server:statusChange', function(event, status) {
      // jscs:disable
      if (status.go_online === true) {
        $scope.onlineCount++;
      }
      if (status.ptc_online === true) {
        $scope.onlineCount++;
      }
      var pogoStabilityAvg = (status.go_response + status.ptc_response) / 2;
      if (pogoStabilityAvg < 5.5 && $scope.onlineCount >= 1) {
        $scope.serverStatus = 'STABLE';
      } else if (pogoStabilityAvg >= 5.5 && pogoStabilityAvg < 10.0 && $scope.onlineCount >= 1) {
        $scope.serverStatus = 'UNSTABLE';
      } else {
        $scope.serverStatus = 'CRITICAL';
      }
      // jscs:enable
    });
    $scope.geolocationTimeout = function(){
      var ts = new Date().getTime();
      return ($localStorage.geoTimeout > 0 && ($localStorage.geoTimeout > ts));
    };
    $scope.getMyLocation = function() {
      var coords = {};
      $scope.geoLocationInProgress = true;
      geolocation.getLocation().then(function(data) {
        coords = {
          lat: data.coords.latitude,
          long: data.coords.longitude
        };
        // get the suburb with reverse-geocoding api
        return $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+coords.lat+','+coords.long+'&key=AIzaSyBrKIantJrntUGd4L3CQ7pmmkJ-qUMFWxc');
      }, function(err){
        return $q.reject(err);
      }).then(function(res){
        // jscs:disable
        var firstResult = res.data.results[0];
        var suburb = false;
        // Extract the suburb by iterating over the first resultset and checking
        // if each is a sublocality (suburb); leave as false if no suburb.
        _.each(firstResult.address_components, function(component){
          if(_.includes(component.types,'sublocality')){
            suburb = component;
          }
        });
        $scope.geoLocationInProgress = false;
        var ts = new Date().getTime();
        $localStorage.geoTimeout = ts + 30000;
        $rootScope.$broadcast('location:coords:available', coords, suburb);
        // jscs:enable
      }, function(err){
        $scope.geoLocationInProgress = false;
        $scope.geoLocationError = true;
        $timeout(function(){
          $rootScope.$broadcast('location:coords:unavailable');
        },250);

        console.error(err);
      });
    };
    uiGmapGoogleMapApi.then(function() {
      $scope.getMyLocation();
    });
  });
