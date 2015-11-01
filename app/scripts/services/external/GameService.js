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
        
      var path = options ? "&format=jsonp&" + options : "&format=jsonp";
      var url = API_BASE_PATH + url + "/?api_key=" + API_KEY  + "&json_callback=JSON_CALLBACK" + path;

      return $http.jsonp(url);
    };
    
    var getAllGames = function(options) {
      return doApiCall('games', options);
    };

    var autocomplete = function(name) {
      return doApiCall('games', "field_list=id,name&limit=25&filter=name:" + name);
    }

    return {
      getAllGames : getAllGames,
      autocomplete : autocomplete
    };
  }
]);
