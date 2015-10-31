'use strict';

/**
 * @ngdoc function
 * @name GameSwap.controller:AncmtController
 * @description
 * # AncmtController
 */
angular.module('GameSwap')
  .controller('AncmtController', function($scope, UserService, AncmtService, GameService, $q) {
    var self= this;
    self.ancmts = [];

    AncmtService.query().$promise.then(function(data) {
      self.ancmts = data;
    });

  });
