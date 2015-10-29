'use strict';

/**
 * @ngdoc function
 * @name GameSwap.controller:CreateAncmtController
 * @description
 * # CreateAncmtController
 */
angular.module('GameSwap')
  .controller('CreateAncmtController', function($scope, UserService, AncmtService, GameService) {

    GameService.getAllGames().then(function(obj) {

        var gamesList = [];
        for(name in obj.data.results){
            
            gamesList.push(obj.data.results[name].name);
            
        }

        console.log(gamesList);
        $scope.gamesList = gamesList;
    });
    $scope.selected = undefined;
	
   

  });

