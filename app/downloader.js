#!/bin/env node

var http = require('http'),
  fs = require('fs');

function _cap(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function _pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
var pokemons = JSON.parse(fs.readFileSync('pokemon.json', 'utf8'));
pokemons.forEach(function(pokemon){
  var name = pokemon.name;
  if (pokemon.name === 'Nidoran F') {
    name = 'Nidoran';
  } else if (name === 'Nidoran M') {
    name = 'Nidorano';
  }
  var url = 'http://icons.iconarchive.com/icons/hektakun/pokemon/72/' + _pad(pokemon.id, 3) + '-' + _cap(name) + '-icon.png';
  var request = http.get(url, function(response) {
    if (response.statusCode === 200) {
      var file = fs.createWriteStream("images/icons/"+pokemon.id+".png");
      response.pipe(file);
    }
    // Add timeout.
    request.setTimeout(12000, function() {
      request.abort();
    });
  });
})
