'use strict';

/**
 * @ngdoc function
 * @name GameSwap.controller:AncmtController
 * @description
 * # AncmtController
 */
angular.module('GameSwap')
  .controller('AncmtController', function($scope, UserService, AncmtService, GameService) {
    this.users = [];
    this.game = [];


    // $scope.googleLogin();
    /*GameService.getAllGames().then(function(data) {
        console.log('Got datas from api ! =>', data);
    });*/

    this.getAllAncmts = function() {
      //AncmtService.query().$promise.then(function(ancmt) {
       // console.log(ancmt);
          /* a supprimer */
          var ancmt = [{title : "échange gta V", img : "http://i.huffpost.com/gen/1066633/images/o-GTA-5-facebook.jpg"},{title : "échange mgs", img : "http://i.jeuxactus.com/datas/jeux/m/e/metal-gear-solid-5-the-phantom-pain/xl/metal-gear-solid-5-the-54f71952e6bbd.jpg"}];
          /* */
          $scope.ancmts = ancmt;

      //});
    }

    this.getAllAncmts();
  });
