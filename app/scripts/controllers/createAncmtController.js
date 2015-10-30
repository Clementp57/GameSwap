'use strict';

/**
 * @ngdoc function
 * @name GameSwap.controller:CreateAncmtController
 * @description
 * # CreateAncmtController
 */
angular.module('GameSwap')
  .controller('CreateAncmtController', function($scope, UserService, AncmtService, GameService) {

    this.ancmt = {};

    this.validateAncmt = function() {
        // TODO Check errors/not valid fields @see : https://scotch.io/tutorials/angularjs-form-validation
        if(this.ancmt.title && this.ancmt.platform && this.ancmt.game && this.ancmt.description) {
            AncmtService.save(this.ancmt).$promise.then(function() {
                console.log('successFully saved fucking ancmt');
            }, function(error) {
                console.log('damned... there was an error :'+error);
            })
        }
        
    }

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

