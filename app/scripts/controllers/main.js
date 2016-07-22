'use strict';
/**
 * @ngdoc function
 * @name ngApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngApp
 */
angular.module('ngApp')
  .controller('MainCtrl', function($rootScope, $scope, $http, $interval, $timeout, $q, uiGmapGoogleMapApi, moment) {
    // uiGmapGoogleMapApi is a promise.
    // The "then" callback function provides the google.maps object.
    uiGmapGoogleMapApi.then(function() {
      main();
    });
    $scope.map = {
      center: {
        latitude: -43.5321,
        longitude: 172.6362
      },
      options: {
        disableDefaultUI: true
      },
      zoom: 12
    };
    $scope.markers = [];
    $scope.infoWindows = [];
    $scope.pokemonList = [];
    $scope.areaList = [{
      name: 'hagley',
      active: false
    }, {
      name: 'riccarton',
      active: false
    }, {
      name: 'addington',
      active: false
    }, {
      name: 'sumner',
      active: false
    }, {
      name: 'brighton',
      active: false
    }];
    $scope.$on('location:coords', function(evt, coords, suburb) {
      // jscs:disable
      var subby = suburb.long_name.toLowerCase();
      var areaIndex = _.findIndex($scope.areaList, {
        name: subby
      });
      if (areaIndex >= 0) {
        $scope.areaList[areaIndex].active = true;
      } else {
        console.warn('AREA NOT ADDED');
      }
      $scope.map.center.latitude = coords.lat;
      $scope.map.center.longitude = coords.long;
      $scope.map.zoom = 16;
      _getPokemonData();
      // jscs:enable
    });
    $scope.radioModel = 'All';
    $scope.radioModelArea = 'None';
    $scope.select = function(value) {
      _.each($scope.pokemonList, function(pokemon) {
        pokemon.active = value;
      });
    };
    $scope.selectArea = function(value) {
      _.each($scope.areaList, function(area) {
        area.active = value;
      });
    };
    $scope.visiblePokemon = function() {
      var returnList = [];
      _.each($scope.markers, function(marker) {
        _.each($scope.pokemonList, function(pokemon) {
          if (pokemon.name === marker.pokemon.name && pokemon.active === true) {
            returnList.push(marker);
          }
        });
      });
      return returnList;
    };
    $scope.redrawAreas = function() {
      $timeout(_getPokemonData, 0);
    };

    function _cap(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function _pad(n, width, z) {
      z = z || '0';
      n = n + '';
      return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }

    function main() {
      $interval(function() {
        _getPokemonData();
      }, 5000);
      // $interval(function(){
      //   _processPokemons($scope.pokemons);
      // }, 1000);
    }

    function _getPokemonIcon(p) {
      var name = p.name;
      if (p.name === 'Nidoran F') {
        name = 'Nidoran';
      } else if (name === 'Nidoran M') {
        name = 'Nidorano';
      }
      return 'http://icons.iconarchive.com/icons/hektakun/pokemon/72/' + _pad(p.id, 3) + '-' + _cap(name) + '-icon.png';
    }

    function removeStalePokemonMarkers() {
      var ts = moment();
      _.each($scope.markers, function(marker, index) {
        if (!marker) {
          return;
        }
        var pokemon = marker.pokemon;
        var tsLeft = moment((pokemon.timestamp + pokemon.timeleft) * 1000);
        if (!tsLeft.isAfter(ts)) {
          console.log('Removing ' + pokemon.name);
          $scope.markers.splice(index, 1);
        }
      });
    }

    function _processPokemons(pokemons) {
      removeStalePokemonMarkers();
      _.each(pokemons, function(pokemon) {
        var ts = moment();
        var tsLeft = moment((pokemon.timestamp + pokemon.timeleft) * 1000);
        if (!tsLeft.isAfter(ts)) {
          return false;
        }
        var countdownTimer = moment.duration(tsLeft - ts).format('mm:ss', {
          trim: false
        });
        var pokeId = $scope.markers.length - 1;
        if (pokeId < 0) {
          pokeId = 0;
        }
        var newMarker = {
          id: pokeId,
          coords: {
            latitude: pokemon.lat,
            longitude: pokemon.lng
          },
          options: {
            draggable: false,
            icon: _getPokemonIcon(pokemon),
            labelContent: countdownTimer,
            labelClass: 'poke-label'
          },
          pokemon: pokemon,
          infoWindow: {
            show: false,
            options: {
              content: '<strong>' + pokemon.name + '</strong><br />' + countdownTimer + ' until despawn<br /><span class="text-muted">Lat: ' + pokemon.lat + '</span><br /><span class="text-muted">Lng: ' + pokemon.lng + '</span>',
            }
          },
        };
        var existingMarkerIndex = _.findIndex($scope.markers, function(o) {
          return (o.coords.latitude === newMarker.coords.latitude && o.coords.longitude === newMarker.coords.longitude);
        });
        if (existingMarkerIndex < 0) {
          $scope.markers.push(newMarker);
          var indexInList = _.findIndex($scope.pokemonList, {
            name: pokemon.name
          });
          if (indexInList < 0) {
            var pkmn = {
              count: 1,
              name: pokemon.name,
              active: true
            };
            if (_.includes([16, 19, 41, 84, 98], pokemon.id)) {
              pkmn.active = false;
            }
            $scope.pokemonList.push(pkmn);
          } else {
            $scope.pokemonList[indexInList].count++;
          }
        } else {
          $scope.markers[existingMarkerIndex].options.labelContent = countdownTimer;
          $scope.markers[existingMarkerIndex].infoWindow.options.content = '<strong>' + pokemon.name + '</strong><br />' + countdownTimer + ' until despawn<br /><span class="text-muted">Lat: ' + pokemon.lat + '</span><br /><span class="text-muted">Lng: ' + pokemon.lng + '</span>';
        }
      });
    }

    function _getPokemonData() {
        var pokemons = [];
        var ts = new Date().getTime().toString();
        var requestUrls = [];
        _.each($scope.areaList, function(area) {
          if (area.active === true) {
            console.log('Looking in ' + area.name);
            var uri = 'https://pokemongomap.notanengineer.com/data.' + area.name + '.json?t=' + ts;
            requestUrls.push(uri);
          }
        });
        $q.all(requestUrls.map(function(request) {
          return $http.get(request);
        })).then(function(results) {
          console.log(results);
          // parse results array
          _.each(results, function(payload) {
            _.each(payload.data, function(p) {
              pokemons.push(p);
            });
          });
          _processPokemons(pokemons);
        });

    }
  });
