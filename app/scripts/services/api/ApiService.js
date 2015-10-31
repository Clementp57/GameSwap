'use strict';

/**
 * @ngdoc service
 * @name GameSwap.ApiService
 * @description
 * # ApiService
 * Retrieves correct api to make requests against.
 * Uses settings from API_ENDPOINT defined in /config/apiEndpoint.js
 *
 * Usage example: $http({
 *                      url: ApiService.getEndPoint() + '/things',
 *                      method: 'GET'
 *                 })
 *
 */
angular.module('GameSwap')
  .factory('ApiService', function($window, $http, API_ENDPOINT) {

    var _api = API_ENDPOINT;

    var basePath = _api.port ? (_api.host + ':' + _api.port) : _api.host;
    var apiBasePath = basePath + _api.path;
    var loginEndPoint = basePath + '/public/login';
    var checkTokenEndPoint = basePath + '/public/token/check';


    // public api
    return { 
      getEndpoint: function() { return apiBasePath; },
      getLoginEndPoint: function() { return loginEndPoint },
      getTokenCheckEndPoint: function() { return checkTokenEndPoint },
      getBasePath: function() { return basePath; }
    };

  });

