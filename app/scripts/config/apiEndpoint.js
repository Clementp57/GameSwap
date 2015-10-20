'use strict';

/**
 * @ngdoc constant
 * @name GameSwap.API_ENDPOINT
 * @description
 * # API_ENDPOINT
 * Defines the API endpoint where our resources will make requests against.
 * Is used inside /services/ApiService.js to generate correct endpoint dynamically
 */


angular.module('GameSwap')

  // development
  .constant('API_ENDPOINT', {
    host: 'https://localhost',
    port: 55555,
    path: '/api/v1',
    needsAuth: false
  });


  // live example with HTTP Basic Auth
  /*
  .constant('API_ENDPOINT', {
    host: 'http://yourserver.com',
    path: '/api/v2',
    needsAuth: true,
    username: 'whatever',
    password: 'foobar'
  });
  */

