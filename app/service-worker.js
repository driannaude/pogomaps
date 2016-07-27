'use strict';
var cacheName = 'blah-pwa';
var filesToCache = [
  '/',
  '/index.html',
  '/scripts/app.js',
];
console.log('Started', self);
self.addEventListener('install', function(event) {
  self.skipWaiting();
  console.log('Installed', event);
});
self.addEventListener('activate', function(event) {
  console.log('Activated', event);
});
self.addEventListener('push', function(event) {
  // TODO: Push stuffs.
});
