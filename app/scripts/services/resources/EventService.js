'use strict';

/**
 * @ngdoc function
 * @name GameSwap.serive:EventService
 * @description
 * # EventService
 */
angular.module('GameSwap')
  // use factory for services
  .factory('EventService', function($resource, ApiService) {
    var usersEndpoint = ApiService.getEndpoint()  + '/events/:id';

    return $resource(usersEndpoint, {
      get: {
        method: 'GET'
      }
    });
  });

