'use strict';

/**
 * @ngdoc function
 * @name GameSwap.controller:CreateAncmtController
 * @description
 * # CreateAncmtController
 */
angular.module('GameSwap')
  .controller('CreateAncmtController', function($scope, UserService, AncmtService, GameService, ServerService) {
    var self = this;

    self.ancmt = {};
    self.gamesList = [];

    UserService.query().$promise.then(function(data) {
      console.log(data);
    });

    console.log(ServerService.getLoggedUser());

    self.validateAncmt = function() {
      // TODO Check errors/not valid fields @see : https://scotch.io/tutorials/angularjs-form-validation
      if (self.ancmt.title && self.ancmt.platform && self.ancmt.game && self.ancmt.description) {
        self.ancmt.date = new Date();
        AncmtService.save(self.ancmt).$promise.then(function() {
          console.log('TODO: redirect');
        }, function(error) {
          console.log('damned... there was an error :' + error);
        })
      }

    };


    self.autocomplete = function(gameName) {

      GameService.autocomplete(gameName.toLowerCase()).then(function(obj) {
        var games = [];
        for (name in obj.data.results) {
          games.push(obj.data.results[name].name);
        }
        self.gamesList = games;
      });

    };

  });