'use strict';

/**
 * # gameAutocomplete
 */
angular.module('GameSwap')
  .directive('gameAutocomplete', function($scope, GameService) {
    GameService.getAllGames().then(function(obj) {
        console.log('Got datas from api ! =>', obj.data.results);
        $scope.games = obj.data.results;
    });
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            scope.$watch(attrs.ngModel, function (v) {
                console.log('value changed, new value is: ' + v);
                //alert('value change: ' + scope.data.test);
            });
        }
    };

  });
