'use strict';
/**
 * @ngdoc function
 * @name ngApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngApp
 */
angular.module('ngApp')
  .controller('NavCtrl', function($rootScope, $scope, $http, $q, $timeout, $geolocation, $localStorage) {
    $localStorage.geoTimeout = 0;
    // Do server status things
    $scope.geoLocationError = false;
    $scope.serverStatus = 'CHECKING...';
    $scope.geolocationTimeout = function() {
      var ts = new Date().getTime();
      return ($localStorage.geoTimeout > 0 && ($localStorage.geoTimeout > ts));
    };
    var curPos = {};
    $scope.getMyLocation = function() {
      $geolocation.getCurrentPosition({
        timeout: 30000
      }).then(function(position) {
        var lat=position.coords.latitude,
            lon=position.coords.longitude;
          curPos.latitude = lat;
          curPos.longitude = lon;
        return $http.get('https://nominatim.openstreetmap.org/reverse?lat='+lat+'&lon='+lon+'&format=json');
      }, function(err){
        return $q.reject(err);
      }).then(function(res){
        console.log(res);
        var suburb = res.data.address.suburb,
            city = res.data.address.city;

        $rootScope.$broadcast('location:coords:available', curPos, suburb, city);
      }, function(err){
        console.error(err);
        $scope.geoLocationError = true;
        $rootScope.$broadcast('location:coords:unavailable');
      });
    };
    $scope.$on('leafletDirectiveMap.load', function() {
      var ts = new Date().getTime();
      $localStorage.$geoTimeout = ts;
      $scope.getMyLocation();
    });
  });
