'use strict';

/**
 * @ngdoc function
 * @name GameSwap.controller:MainController
 * @description
 * # MainController
 */
angular.module('GameSwap')
  .controller('MainController', function($ionicHistory, ServerService, $state, $timeout) {
    this.userPic = ServerService.getLoggedUser.picture;

    this.logOut = function() {
    	ServerService.logOut();
    	$state.go('login');
    }

  });
