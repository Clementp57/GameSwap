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
    var usersEndpoint = ApiService.getEndpoint()  + '/annoncements';

    return $resource(usersEndpoint, { id: '@_id' }, {
      get: {
        method: 'GET'
      }
    });
  });

