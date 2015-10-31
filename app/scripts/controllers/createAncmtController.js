'use strict';

/**
 * @ngdoc function
 * @name GameSwap.controller:CreateAncmtController
 * @description
 * # CreateAncmtController
 */
angular.module('GameSwap')
  .controller('CreateAncmtController', function($scope, UserService, AncmtService, GameService) {
    
    $scope.keyupevt = function(gameName) {
 
      GameService.getAllGames("field_list=id,name&limit=25&filter=name:"+gameName).then(function(obj) {

        var gamesList = [];

        for (name in obj.data.results) {

          gamesList.push(obj.data.results[name].name);

        }

        //console.log(gamesList);
        $scope.gamesList = gamesList;
      });

    };
    
  });