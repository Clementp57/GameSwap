'use strict';

/**
 * @ngdoc function
 * @name GameSwap.controller:HomeController
 * @description
 * # HomeController
 */
angular.module('GameSwap')
  .controller('HomeController', function(UserService, GameService, $window) {
    this.getAllUsers = function() {
      UserService.query().$promise.then(function(data) {
        console.log(data);
      });
    }

    this.getAllUsers();
  });
