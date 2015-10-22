'use strict';

/**
 * @ngdoc function
 * @name GameSwap.serive:LoginService
 * @description
 * # ExampleService
 */
angular.module('GameSwap')
  // use factory for services
  .factory('LoginService', function($resource, ApiService, $http) {
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
    		console.log(response);
    	}).error(function(error) {
    		console.log('failed to log user : ', error);
    	});

    }

    return this;
  });

