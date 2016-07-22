'use strict';
/**
 * @ngdoc function
 * @name ngApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngApp
 */
angular.module('ngApp')
  .controller('NavCtrl', function($scope) {
    // Do server status things
    $scope.serversAreDown = false;
    $scope.serverStatus = 'CHECKING...';
    $scope.onlineCount = 0;
    $scope.$on('server:statusChange', function(event,status){
      // jscs:disable
      if(status.go_online === true){
        $scope.onlineCount++;
      }
      if(status.ptc_online === true){
        $scope.onlineCount++;
      }
      var pogoStabilityAvg = (status.go_response + status.ptc_response) / 2;
      if(pogoStabilityAvg < 0.8 && $scope.onlineCount >= 1){
        $scope.serverStatus = 'STABLE';
      } else if (pogoStabilityAvg > 0.8 && pogoStabilityAvg < 3.0 && $scope.onlineCount >= 1){
        $scope.serverStatus = 'UNSTABLE';
      } else {
        $scope.serverStatus = 'CRITICAL';
      }
      // jscs:enable
    });
  });
