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
    host: 'http://localhost',
    port: 5000,
    path: '/api/v1',
    needsAuth: false
  });
  
  // production
  // .constant('API_ENDPOINT', {
  //   host: 'http://emm-project3.herokuapp.com',
  //   path: '/api/v1',
  //   needsAuth: false
  // });


