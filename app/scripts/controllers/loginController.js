'use strict';

/**
 * @ngdoc function
 * @name GameSwap.controller:LoginController
 * @description
 * # HomeController
 */
angular.module('GameSwap')
  .controller('LoginController', function($cordovaOauth, $window, $http, ServerService, $location, $state) {
    this.users = [];

    this.loginFacebook = function(){
        $cordovaOauth.facebook("392617384261537", ["email", "user_friends"]).then(function(result) {
            console.log("Result => ",result);
            $window.localStorage.accessToken = result.access_token;
            $http.get("https://graph.facebook.com/v2.2/me", { params: { access_token: $window.localStorage.accessToken, fields: "email,friends", format: "json" }}).then(function(result) {
                console.log(result.data);
                ServerService.logUser(result.data.email);
                $state.go('app/home')    
            }, function(error) {
                alert("There was a problem getting your profile.  Check the logs for details.");
                console.log(error);
            });

        }, function(error) {    
            alert('Cannot authenticate in web browser! Faking login');
            ServerService.logUser("Didier");
            $state.go('app.home');
        });
    };
  });
