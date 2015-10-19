'use strict';

/**
 * @ngdoc function
 * @name GameSwap.serive:GameService
 * @description
 * # GameService
 */
angular.module('GameSwap')
  // use factory for services
  .factory('GameService', ['$http', function($http) {

    return {
        doApiCall: function(url, options, payload, headers){

            // I should make a call to server with the parameters passed
            // from the controller.
            var path = options ? "&format=json&"+options : "&format=json";
            
            var xhr = $http({
                method: 'GET',
                url: "http://www.giantbomb.com/api/" + url + "/?api_key=626390667861da8f3f8989917b8cd5823146d1c1" + path,
                headers: headers || {}, // Optional headers
            });

            // You probably want to differentiate success / error handlers
            xhr.success(payload);
            xhr.error(payload);

            return xhr;
        }
    };
}]);
