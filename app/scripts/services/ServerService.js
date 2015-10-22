'use strict';

/**
 * @ngdoc function
 * @name GameSwap.serive:LoginService
 * @description
 * # ExampleService
 */
angular.module('GameSwap')
  // use factory for services
  .factory('ServerService', function($resource, ApiService, $http, $window) {
    var loginEndPoint = ApiService.getLoginEndPoint();

    this.logUser = function(email) {
    	if(!email) {
    		throw 'No email specified';
    		return;
    	}

    	var data = JSON.stringify({
    		firstName : email 
    	});

    	$http.post(loginEndPoint, data).success(function(response) {
            $window.localStorage.server_token = response.token;
            $window.localStorage.logged_user = JSON.stringify(response.user);
    	}).error(function(error) {
    		console.error('failed to log user : ', error);
    	});

    };

    this.getLoggedUser = function() {
        return JSON.parse($window.localStorage.logger_user);
    }

    return this;
  });

