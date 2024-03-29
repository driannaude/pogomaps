'use strict';
/**
 * @ngdoc function
 * @name ngApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngApp
 */
angular.module('ngApp')
  .controller('MainCtrl', function($rootScope, $scope, $http, $interval, $timeout, $q, $localStorage, uiGmapGoogleMapApi, moment, snapRemote) {
    // loading
    $scope.viewContentLoaded = false;
    $scope.showLoader = true;

    $scope.toggleViewStates = function(item) {
      $scope.viewStates[item] = ($scope.viewStates[item] === 'on') ? 'off' : 'on';
      $scope.viewBools[item] = ($scope.viewBools[item]) ? false : true;
    };
    // get domain info, check if timaru
    var _domain = window.location.host.split('.');
    // Proper localStorage Sync
    $scope.$storage = $localStorage;
    // Adblocker detection
    $scope.$on('adblock:state', function() {
      $scope.hasAdblocker = $rootScope.hasAdblocker;
    });
    // Register event listeners on snap events so we can add/remove classes
    snapRemote.getSnapper().then(function(snapper) {
      snapper.on('open', function() {
        $('.toggle-with-snap').addClass('open');
      });
      snapper.on('close', function() {
        $('.toggle-with-snap').removeClass('open');
      });
    });
    $scope.clearCache = function() {
      window.location.reload(true);
    };
    $scope.clearCacheAndStorage = function() {
      $localStorage.$reset();
      window.location.reload(true);
    };
    $scope.snapOpts = {
      disable: 'left',
      maxPosition: 275,
      minPosition: -275,
    };
    // Magic sauce, imediate so the value is stored and we don't need to lookup every check
    $scope.isNotMobile = function() {
      //jshint ignore:start
      var check = false;
      (function(a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true
      })(navigator.userAgent || navigator.vendor || window.opera);
      return !check;
      //jshint ignore:end
    };
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
      events: {
        idle: function() {
          $scope.viewContentLoaded = true;
          console.log('idle');
        }
      },
      zoom: 12
    };
    $scope.markers = [];
    $scope.pokestops = [];
    $scope.gyms = [];
    $scope.appConfig = {};
    var ts = new Date().getTime();
    var configFile = 'config.json?=' + ts;
    $http.get(configFile).then(function(res) {
      var config = res.data;
      $scope.appConfig = config;
      var ts = moment($scope.$storage.lastUpdated);
      var updated = moment(config.lastUpdated);
      if (config.dev || updated.isAfter(ts)) {
        $scope.$storage.lastUpdated = config.lastUpdated;
        getfromCache(true);
      } else {
        getfromCache();
      }
    }, function(err) {
      console.error(err);
      getfromCache();
    });
    $scope.areaList = [];
    $scope.pokemonList = [];

    function getfromCache(reload) {
      // View states

      if ((!$scope.$storage.viewBools || !$scope.$storage.viewStates) || reload) {
        $scope.viewBools = {
          gyms: true,
          pokestops: true,
          pokemon: true,
        };
        $scope.viewStates = {
          gyms: 'on',
          pokestops: 'on',
          pokemon: 'on',
        };
        $scope.$storage.viewBools = $scope.viewBools;
        $scope.$storage.viewStates = $scope.viewStates;
      } else {
        $scope.viewBools = $scope.$storage.viewBools;
        $scope.viewStates = $scope.$storage.viewStates;
      }
      // Get full list of pokemon defaults
      $scope.areaList = $scope.$storage.pokemonList || [];
      if (!$scope.$storage.pokemonList || $scope.$storage.pokemonList.length < 151 || reload) {
        $http.get('pokemon.json').then(function(res) {
          $scope.$storage.pokemonList = res.data;
          $scope.pokemonList = $scope.$storage.pokemonList;
        }, function(err) {
          console.error(err);
        });
      } else {
        $scope.pokemonList = $scope.$storage.pokemonList;
        _.each($scope.pokemonList, function(p) {
          p.count = 0;
        });
      }
      $scope.areaList = $scope.$storage.areaList || [];
      if (!$scope.$storage.areaList || reload) {
        var areaFile = 'districts.json';
        if (_domain[0] === 'timaru') {
          areaFile = 'timaru.json';
        }
        $http.get(areaFile).then(function(res) {
          console.log('got areas for' + areaFile);
          console.warn(res.data);
          $scope.$storage.areaList = res.data;
          $scope.areaList = $scope.$storage.areaList;
        }, function(err) {
          console.error(err);
        });
      } else {
        $scope.areaList = $scope.$storage.areaList;
      }
      _getPokemonData(true);
    }
    $scope.userMarker = {
      coords: {},
      options: {},
      events: {}
    };
    $scope.$on('location:coords:unavailable', function() {
      console.log('no location');
      $scope.showLoader = false;
      $scope.viewContentLoaded = true;
    });
    $scope.$on('location:coords:available', function(evt, coords, suburb, locality) {
      var subby = false,
        city = false;
      if (suburb) {
        subby = suburb.long_name.toLowerCase().replace(' ', '');
      }
      if (locality) {
        city = locality.long_name.toLowerCase().replace(' ', '');
      }
      if (city === 'timaru' && window.location.href.indexOf('timaru') === -1) {
        window.location = 'https://timaru.thepokemapapp.com/app/';
      }
      var areaIndex = _.findIndex($scope.areaList, function(o) {
        if (o.hasOwnProperty('alt')) {
          return o.alt === subby;
        }
        return o.name === subby;
      });
      if (areaIndex >= 0) {
        $scope.areaList[areaIndex].active = true;
      } else {
        console.warn('AREA NOT ADDED: [' + subby + ']');
      }
      console.log('found user at: ', coords);
      $scope.userMarker.coords.latitude = coords.lat;
      $scope.userMarker.coords.longitude = coords.long;
      $scope.map.center.latitude = coords.lat;
      $scope.map.center.longitude = coords.long;
      $scope.map.zoom = 15;
      _getPokemonData(true);
      $scope.showLoader = false;
    });
    $scope.radioModel = 'All';
    $scope.radioModelArea = 'None';
    $scope.select = function(value) {
      _.each($scope.pokemonList, function(pokemon) {
        pokemon.active = value;
      });
    };
    $scope.selectNoAreas = function() {
      _.each($scope.areaList, function(area) {
        area.active = false;
      });
    };
    $scope.mapMarkers = {};
    $scope.mapMarkers.pokemon = [];
    $scope.mapMarkers.pokestops = [];
    $scope.mapMarkers.gyms = [];
    $scope.infoWindows = {};
    $scope.infoWindows.pokemon = [];
    $scope.visiblePokemon = function() {
      var returnList = [];
      if (!$scope.viewBools || !$scope.viewBools.pokemon) {
        return [];
      }
      _.each($scope.markers, function(marker) {
        _.each($scope.pokemonList, function(pokemon) {
          if (pokemon.id === marker.pokemon.pokemon_id && pokemon.active === true) {
            returnList.push(marker);
          }
        });
      });
      return returnList;
    };
    $scope.visiblePokestops = function() {
      var returnList = [];
      if (!$scope.viewBools || !$scope.viewBools.pokestops) {
        return [];
      }
      _.each($scope.pokestops, function(marker) {
        returnList.push(marker);
      });
      return returnList;
    };
    $scope.visibleGyms = function() {
      var returnList = [];
      if (!$scope.viewBools || !$scope.viewBools.gyms) {
        return [];
      }
      _.each($scope.gyms, function(marker) {
        returnList.push(marker);
      });
      return returnList;
    };
    $scope.redrawAreas = _.debounce(function() {
      $timeout(function() {
        _getPokemonData(true);
      }, 0);
    }, 500);

    function main() {
      _getPokemonData(true);
      $interval(function() {
        _getPokemonData();
      }, 1000);
    }

    function _getPokemonIcon(p) {
      return 'images/icons/' + p.pokemon_id + '.png';
    }

    function removeStalePokemonListItem(pokemon) {
      var pIndex = _.findIndex($scope.pokemonList, {
        id: pokemon.pokemon_id
      });
      if (pIndex > -1) {
        $scope.pokemonList[pIndex].count--;
        if ($scope.pokemonList[pIndex].count <= 0) {
          $scope.pokemonList[pIndex].count = 0;
        }
      }
    }

    function removeStalePokemonMarkers() {
      var ts = moment();
      _.each($scope.markers, function(marker, index) {
        if (!marker) {
          return;
        }
        var pokemon = marker.pokemon;
        var originArea = pokemon.district;
        var area = _.find($scope.areaList, function(o) {
          if (o.hasOwnProperty('alt')) {
            return o.alt === originArea;
          }
          return o.name === originArea;
        });
        if (!area.active) {
          removeStalePokemonListItem(pokemon);
          $scope.markers.splice(index, 1);
        } else {
          var time = new Date(pokemon.disappear_time).getTime();
          var tsLeft = moment.utc(time);
          if (!tsLeft.isAfter(ts)) {
            removeStalePokemonListItem(pokemon);
            $scope.markers.splice(index, 1);
          }
        }
      });
    }

    function removeStalePokestopMarkers() {
      _.each($scope.pokestops, function(marker, index) {
        if (!marker) {
          return;
        }
        var pokestop = marker.stop;
        var originArea = pokestop.district;
        var area = _.find($scope.areaList, function(o) {
          if (o.hasOwnProperty('alt')) {
            return o.alt === originArea;
          }
          return o.name === originArea;
        });
        if (!area.active) {
          $scope.pokestops.splice(index, 1);
        }
      });
    }

    function removeStaleGymMarkers() {
      _.each($scope.gyms, function(marker, index) {
        if (!marker) {
          return;
        }
        var gym = marker.gym;
        var originArea = gym.district;
        var area = _.find($scope.areaList, function(o) {
          if (o.hasOwnProperty('alt')) {
            return o.alt === originArea;
          }
          return o.name === originArea;
        });
        if (!area.active) {
          $scope.gyms.splice(index, 1);
        }
      });
    }

    function updateTimers() {
      _.each($scope.markers, function(marker, i) {
        var pokemon = marker.pokemon;
        var ts = moment();
        var time = new Date(pokemon.disappear_time).getTime();
        var tsLeft = moment.utc(time);
        var countdownTimer = moment.duration(tsLeft - ts).format('mm:ss', {
          trim: false
        });
        $scope.markers[i].options.labelContent = countdownTimer;
        $scope.markers[i].title = '<strong>' + pokemon.pokemon_name + '</strong><br />' + countdownTimer + ' until despawn<br /><span class="text-muted">Lat: ' + pokemon.latitude + '</span><br /><span class="text-muted">Lng: ' + pokemon.longitude + '</span>';
      });
    }

    function _processPokemons(pokemons) {
      removeStalePokemonMarkers();
      updateTimers();
      var pkmnCounter = 1;
      _.each(pokemons, function(pokemon) {
        var ts = moment();

        var time = new Date(pokemon.disappear_time).getTime();
        var tsLeft = moment.utc(time);
        if (!tsLeft.isAfter(ts)) {
          return false;
        }
        pkmnCounter++;
        var countdownTimer = moment.duration(tsLeft - ts).format('mm:ss', {
          trim: false
        });
        var newMarker = {
          id: pokemon.encounter_id,
          coords: {
            latitude: pokemon.latitude,
            longitude: pokemon.longitude
          },
          options: {
            draggable: false,
            icon: _getPokemonIcon(pokemon),
            labelContent: countdownTimer,
            labelClass: 'poke-label'
          },
          events: {
            click: function(marker, eventName, model) {
              console.log('Clicked!', model);
              model.show = (model.show) ? false : true;
            }
          },
          pokemon: pokemon,
          show: false,
          title: '<strong>' + pokemon.pokemon_name + '</strong><br />' + countdownTimer + ' until despawn<br /><span class="text-muted">Lat: ' + pokemon.latitude + '</span><br /><span class="text-muted">Lng: ' + pokemon.longitude + '</span>'
        };
        var existingMarkerIndex = _.findIndex($scope.markers, function(o) {
          return (o.pokemon.encounter_id === newMarker.pokemon.encounter_id);
        });
        if (existingMarkerIndex < 0) {
          $scope.markers.push(newMarker);
          var indexInList = _.findIndex($scope.pokemonList, {
            id: pokemon.pokemon_id
          });
          if (_.includes([16, 19, 41, 84, 98], pokemon.pokemon_id)) {
            $scope.pokemonList[indexInList].count++;
          } else {
            if (!$scope.pokemonList[indexInList].encountered) {
              $scope.pokemonList[indexInList].active = true;
              $scope.pokemonList[indexInList].encountered = true;
            }
            $scope.pokemonList[indexInList].count++;
          }
        }
      });
      $scope.mapMarkers.pokemon = $scope.visiblePokemon();
    }

    function _getPokestopIcon(stop) {
      if (stop.lure_expiration === null) {
        return 'images/pokestop.png';
      }
      return 'images/pokestop-lured.png';
    }

    function _processPokeStops(stops) {
      removeStalePokestopMarkers();
      _.each(stops, function(stop, i) {
        var existingMarkerIndex = _.findIndex($scope.pokestops, function(o) {
          return (o.stop.pokestop_id === stop.pokestop_id);
        });
        var newMarker = {
          id: stop.pokestop_id,
          coords: {
            latitude: stop.latitude,
            longitude: stop.longitude
          },
          options: {
            draggable: false,
            icon: _getPokestopIcon(stop)
          },
          stop: stop,
          show: false
        };
        if (existingMarkerIndex < 0) {
          $scope.pokestops.push(newMarker);
        } else {
          $scope.pokestops[i].options.icon = _getPokestopIcon(stop);
        }
      });
      $scope.mapMarkers.pokestops = $scope.visiblePokestops();
    }

    function _getGymIcon(gym) {
      switch (gym.team_id) {
        case 0:
          // uncontested
          return 'images/gym-open.png';
        case 1:
          // mystic
          return 'images/gym-mystic.png';
        case 2:
          // valor
          return 'images/gym-valor.png';
        case 3:
          // instinct
          return 'images/gym-instinct.png';
        default:
          return false;
      }
    }

    function _processGyms(gyms) {
      removeStaleGymMarkers();
      _.each(gyms, function(gym, i) {
        var existingMarkerIndex = _.findIndex($scope.gyms, function(o) {
          return (o.gym.gym_id === gym.gym_id);
        });
        var newMarker = {
          id: gym.gym_id,
          coords: {
            latitude: gym.latitude,
            longitude: gym.longitude
          },
          options: {
            draggable: false,
            icon: _getGymIcon(gym)
          },
          gym: gym,
          show: false
        };
        if (existingMarkerIndex < 0) {
          $scope.gyms.push(newMarker);
        } else {
          $scope.gyms[i].options.icon = _getGymIcon(gym);
        }
      });
      $scope.mapMarkers.gyms = $scope.visibleGyms();
    }
    var _iterations = 0;
    var pokemons = [];
    var pokestops = [];
    var gyms = [];
    var requestActive = false;

    function _getPokemonInfo(id) {
      var p = _.find($scope.pokemonList, {
        id: id
      });
      return p;
    }

    function _getPokemonData(init) {
      // Only fetch new pokemon every 30 secs to save battery/data
      if (_iterations < 10 && !init) {
        _iterations++;
        _processPokeStops(pokestops);
        _processGyms(gyms);
        _processPokemons(pokemons);
        return false;
      }

      // var ts = new Date().getTime().toString();
      var requestUrls = [];
      _.each($scope.areaList, function(area) {
        if (area.active === true) {
          var name;
          if (area.hasOwnProperty('alt')) {
            name = area.alt;
          } else {
            name = area.name;
          }

          var ts = new Date().toUTCString();
          var uri = 'https://api.thepokemapapp.com/pokemon?filter[where][and][0][district]=' + name + '&filter[where][and][1][disappear_time][gt]=' + ts;
          var uriStops = 'https://api.thepokemapapp.com/pokestops?filter[where][and][0][district]=' + name + '&filter[where][and][1][enabled]=1&t=' + ts;
          var uriGyms = 'https://api.thepokemapapp.com/gyms?filter[where][and][0][district]=' + name + '&filter[where][and][1][enabled]=true&ts=' + ts;
          requestUrls.push(uriStops);
          requestUrls.push(uriGyms);
          requestUrls.push(uri);
        }
      });
      if (!requestActive) {

        $q.all(requestUrls.map(function(request) {
          requestActive = true;
          return $http.get(request);
        })).then(function(results) {
          pokemons = [];
          pokestops = [];
          gyms = [];
          // parse results array
          _.each(results, function(payload) {
            if (payload.config.url.indexOf('pokemon?') !== -1) {
              _.each(payload.data, function(p) {
                p.area = p.district;
                p.pokemon_name = _getPokemonInfo(p.pokemon_id).name;
                pokemons.push(p);
              });
            } else if (payload.config.url.indexOf('pokestops?') !== -1) {
              //pokestops
              pokestops = payload.data;
              _processPokeStops(pokestops);
            } else if (payload.config.url.indexOf('gyms?') !== -1) {
              //gyms
              gyms = payload.data;
              _processGyms(gyms);
            }
          });
          requestActive = false;
          _iterations = 0;
          _processPokemons(pokemons);
        }, function(err) {
          requestActive = false;
          _iterations = 0;
          console.error(err);
        });
      }
    }
  });
