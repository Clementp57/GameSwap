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

    var API_BASE_PATH = "http://www.giantbomb.com/api/";
    var API_KEY = "626390667861da8f3f8989917b8cd5823146d1c1";

    var doApiCall = function(url, options) {

      // I should make a call to server with the parameters passed
      // from the controller.
      var path = options ? "&format=jsonp&" + options : "&format=jsonp";

      var url = API_BASE_PATH + url + "/?api_key=" + API_KEY  + "&json_callback=JSON_CALLBACK" + path;

      return $http.jsonp(url);
    };
    
    var getAllGames = function() {
      return doApiCall('games','field_list=genres,name');
    };

    return {
      getAllGames : getAllGames
    };
  }
]);
