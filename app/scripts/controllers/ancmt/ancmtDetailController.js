'use strict';

/**
 * @ngdoc function
 * @name GameSwap.controller:AncmtDetailController
 * @description
 * # AncmtDetailController
 */
angular.module('GameSwap')
  .controller('AncmtDetailController', function(UserService, AncmtService, $stateParams) {
    var self = this;
    self.ancmt = {};

    AncmtService.get({
      'id': $stateParams.id
    }).$promise.then(function(data) {
      self.ancmt = data;
      UserService.get({
        id: self.ancmt.creatorId
      }).$promise.then(function(user) {
        self.author = user;
      });
    });



  });
