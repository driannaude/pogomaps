'use strict';
/**
 * @ngdoc function
 * @name ngApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngApp
 */
angular.module('ngApp')
  .controller('MainCtrl', function($scope, $http, $interval, $timeout, $q, uiGmapGoogleMapApi, moment) {
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
      zoom: 12
    };
    $scope.markers = [];
    $scope.infoWindows = [];
    $scope.pokemonList = [];
    $scope.radioModel = 'All';
    $scope.select = function(value) {
      _.each($scope.pokemonList, function(pokemon) {
        pokemon.active = value;
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

    function _cap(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function _pad(n, width, z) {
      z = z || '0';
      n = n + '';
      return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }

    function main() {
      _getPokemonData();
      $interval(function() {
        _getPokemonData();
      }, 5000);
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
        if(!marker){
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
            icon: _getPokemonIcon(pokemon)
          },
          pokemon: pokemon,
          infoWindow: {
            show: false,
            options: {
              content: '<strong>' + pokemon.name + '</strong><br />' + tsLeft.fromNow(ts) + ' until despawn<br /><span class="text-muted">Lat: ' + pokemon.lat + '</span><br /><span class="text-muted">Lng: ' + pokemon.lng + '</span>',
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
            $scope.pokemonList.push(pkmn);
          } else {
            $scope.pokemonList[indexInList].count++;
          }
        } else {
          $scope.markers[existingMarkerIndex].infoWindow.options.content = '<strong>' + pokemon.name + '</strong><br />' + tsLeft.fromNow(ts) + ' until despawn<br /><span class="text-muted">Lat: ' + pokemon.lat + '</span><br /><span class="text-muted">Lng: ' + pokemon.lng + '</span>';
        }
      });
    }

    function _getPokemonData() {
      var pokemons = [];
      var ts = new Date().getTime().toString();
      $http.get('https://pokemongomap.notanengineer.com/data.sumner.json?t=' + ts).then(function(res) {
        var data = res.data;
        pokemons = data;
        return $http.get('https://pokemongomap.notanengineer.com/data.hagley.json?t=' + ts);
      }, function(err) {
        console.error(err);
        return $http.get('https://pokemongomap.notanengineer.com/data.hagley.json?t=' + ts);
      }).then(function(res) {
        var data = res.data;
        _.each(data, function(pokemon) {
          pokemons.push(pokemon);
        });
        return $http.get('https://pokemongomap.notanengineer.com/data.riccarton.json?t=' + ts);
      }, function(err) {
        console.error(err);
        return $http.get('https://pokemongomap.notanengineer.com/data.riccarton.json?t=' + ts);
      }).then(function(res) {
        var data = res.data;
        _.each(data, function(pokemon) {
          pokemons.push(pokemon);
        });
        return $http.get('https://pokemongomap.notanengineer.com/data.brighton.json?t=' + ts);
      }, function(err) {
        console.error(err);
        return $http.get('https://pokemongomap.notanengineer.com/data.brighton.json?t=' + ts);
      }).then(function(res) {
        var data = res.data;
        _.each(data, function(pokemon) {
          pokemons.push(pokemon);
        });
        return $http.get('https://pokemongomap.notanengineer.com/data.addington.json?t=' + ts);
      }, function(err) {
        console.error(err);
        return $http.get('https://pokemongomap.notanengineer.com/data.addington.json?t=' + ts);
      }).then(function(res) {
        var data = res.data;
        _.each(data, function(pokemon) {
          pokemons.push(pokemon);
        });
        _processPokemons(pokemons);
      }, function(err) {
        console.error(err);
        _processPokemons(pokemons);
      });
    }
  });
