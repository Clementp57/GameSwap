'use strict';

/**
 * @ngdoc function
 * @name GameSwap.controller:MainController
 * @description
 * # MainController
 */
angular.module('GameSwap')
  .controller('MainController', function($ionicHistory, ServerService, $state, $timeout) {
    this.userPic = "http://lorempixel.com/400/200/";

    this.logOut = function() {
    	ServerService.logOut();
    	$state.go('login');
    }

  });
