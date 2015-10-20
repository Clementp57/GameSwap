'use strict';

/**
 * @ngdoc function
 * @name GameSwap.controller:LoginController
 * @description
 * # HomeController
 */
angular.module('GameSwap')
  .controller('LoginController', function($scope, $cordovaOauth, $window, $http, LoginService, $location, $state) {
    this.users = [];

    $scope.loginFacebook = function(){
        $cordovaOauth.facebook("392617384261537", ["email", "user_friends"]).then(function(result) {
            console.log("Result => ",result);
            $window.localStorage.accessToken = result.access_token;
            $http.get("https://graph.facebook.com/v2.2/me", { params: { access_token: $window.localStorage.accessToken, fields: "email,friends", format: "json" }}).then(function(result) {
                console.log(result.data);
                LoginService.logUser(result.data.email);
                $state.go('app/home')    
            }, function(error) {
                alert("There was a problem getting your profile.  Check the logs for details.");
                console.log(error);
            });

        }, function(error) {    
            alert('Cannot authenticate in web browser! Faking login');
            LoginService.logUser("Didier");
            $state.go('app.home');
        });
    };
  });
