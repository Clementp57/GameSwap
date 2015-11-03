'use strict';

/**
 * @ngdoc function
 * @name GameSwap.controller:MainController
 * @description
 * # MainController
 */
angular.module('GameSwap')
  .controller('MainController', function($ionicHistory, ServerService, $state, $timeout, $rootScope) {
    $rootScope.userPic = ServerService.getLoggedUser().picture;
    $rootScope.userName =  ServerService.getLoggedUser().name.first;

    this.logOut = function() {
    	ServerService.logOut();
    	$state.go('login');
    }

  });
