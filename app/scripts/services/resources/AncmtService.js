'use strict';

/**
 * @ngdoc function
 * @name GameSwap.serive:ExampleService
 * @description
 * # AncmtService
 */
angular.module('GameSwap')
  // use factory for services
  .factory('AncmtService', function($resource, ApiService) {
    var usersEndpoint = ApiService.getEndpoint()  + '/annoncements/:id';

    return $resource(usersEndpoint, {
      get: {
        method: 'GET',
        params: {id : 'id'},
        isArray: true
      },
     delete: {
        method: 'DELETE',
        params: {id : 'id'},
        isArray: true
      }
    });
  });

