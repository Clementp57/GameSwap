'use strict';

/**
 * @ngdoc function
 * @name GameSwap.serive:ExampleService
 * @description
 * # ExampleService
 */
angular.module('GameSwap')
  // use factory for services
  .factory('UserService', function($resource, ApiService) {
    var usersEndpoint = ApiService.getEndpoint()  + '/users/:id';

    return $resource(usersEndpoint, { id: '@_id' }, {
      update: {
        method: 'PUT'
      }
    });
  });

