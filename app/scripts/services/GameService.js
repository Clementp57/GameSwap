'use strict';

/**
 * @ngdoc function
 * @name GameSwap.serive:GameService
 * @description
 * # GameService
 */
angular.module('GameSwap')
// use factory for services
.factory('GameService', ['$http',
  function($http) {

    return {
      doApiCall: function(url, options, cb, headers) {

        // I should make a call to server with the parameters passed
        // from the controller.
        var path = options ? "&format=json&" + options : "&format=json";
        var APIkey = '626390667861da8f3f8989917b8cd5823146d1c1';
          
        $http({
            method: 'GET',
            url: "http://www.giantbomb.com/api/" + url + "/?api_key=" + APIkey + path,
            headers: { 'Access-Control-Allow-Origin': 'http://localhost:9000' }
        }).then(function successCallback(response) {
            
            cb(response);
            
        }, function errorCallback(response) {
            
          console.log(response);
            
        });

      }
    };
  }
]);
