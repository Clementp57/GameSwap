'use strict';

/**
 * @ngdoc function
 * @name GameSwap.controller:HomeController
 * @description
 * # HomeController
 */
angular.module('GameSwap')
  .controller('HomeController', function($scope, ExampleService, UserService, GameService, $cordovaOauth) {
    this.users = [];

    console.log($cordovaOauth);
    $cordovaOauth.facebook("392617384261537", ["email"], {redirect_uri: "http://localhost/callback"}).then(function(result) {
    	console.log("Result => "+result);
    }, function(error) {	
        console.error('EPIC FAIL : ', error);
    });

    // $scope.googleLogin = function() {
    //     console.log('tryin to log in to google');
    //     $cordovaOauth.google("654202242617-vnnhgv43m1nt29b5jakkk8jrp923g8qm.apps.googleusercontent.com", ["https://www.googleapis.com/auth/urlshortener", "https://www.googleapis.com/auth/userinfo.email"]).then(function(result) {
    //         console.log(JSON.stringify(result));
    //     }, function(error) {
    //         console.log(error);
    //     });
    // };

    // $scope.googleLogin();
    GameService.getAllGames().then(function(data) {
        console.log('Got datas from api ! =>', data);
    });

    this.getAllUsers = function() {
      UserService.query().$promise.then(function(data) {
        console.log(data);
      });
    }

    this.getAllUsers();
  });
