'use strict';

/**
 * @ngdoc function
 * @name GameSwap.controller:CreateAncmtController
 * @description
 * # CreateAncmtController
 */
angular.module('GameSwap')
  .controller('CreateAncmtController', function(UserService, AncmtService, GameService, ServerService) {
    var self = this;

    self.platform = ["Playsation 3", "Playsation 4", "Xbox 360", "Xbox One", "PC", "Wii", "Wii U", "Ancien modèle"];

    self.ancmt = {};
    self.gamesList = [];

    self.autocompleteDelay = null;

    UserService.query().$promise.then(function(data) {
      console.log(data);
    });

    self.validateAncmt = function() {
      // TODO Check errors/not valid fields @see : https://scotch.io/tutorials/angularjs-form-validation
      if (self.ancmt.title && self.ancmt.platform && self.ancmt.game && self.ancmt.description & self.ancmt.photo) {
        self.ancmt.date = new Date();
        AncmtService.save(self.ancmt).$promise.then(function() {
          console.log('TODO: redirect');
        }, function(error) {
          console.log('damned... there was an error :' + error);
        });
      }
    };


    var searchGame = function(gameName){
        self.autocompleteDelay = setTimeout(function() {
            GameService.autocomplete(gameName.toLowerCase()).then(function(obj) {
              var games = [];
              for (name in obj.data.results) {
                games.push(obj.data.results[name].name);
              }
              self.gamesList = games;
            });
          }, 500);
    }
    
    self.autocomplete = function(gameName) {

      if (!gameName == "") {
        if (self.autocompleteDelay) {
          clearTimeout(self.autocompleteDelay);
          searchGame(gameName);
        } else {
          searchGame(gameName);

        }
      } else {
        self.gamesList = "";
      }
    };

    self.takePicture = function() {
      navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL
      });

      function onSuccess(imageData) {
        var image = document.getElementById('imgGame');
        image.src = "data:image/jpeg;base64," + imageData;
      }

      function onFail(message) {
        alert('Failed because: ' + message);
      }

    };

  });
