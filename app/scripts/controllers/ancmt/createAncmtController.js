'use strict';

/**
 * @ngdoc function
 * @name GameSwap.controller:CreateAncmtController
 * @description
 * # CreateAncmtController
 */
angular.module('GameSwap')
  .controller('CreateAncmtController', function(UserService, AncmtService, GameService, ServerService, $state) {
    var self = this;

    self.plateform = ["Playstation 3", "Playstation 4", "Xbox 360", "Xbox One", "PC", "Wii", "Wii U", "Autre"];

    self.ancmt = {};
    self.gamesList = [];
    self.ancmt.img = null;
    
    self.ancmt.creatorId = ServerService.getLoggedUser()._id;
    
    self.autocompleteDelay = null;

    UserService.query().$promise.then(function(data) {
      console.log(data);
    });

    self.validateAncmt = function(isValid) {
      // TODO Check errors/not valid fields @see : https://scotch.io/tutorials/angularjs-form-validation
      if (isValid) {
        
        self.ancmt.date = new Date();
          console.log(self.ancmt);
        AncmtService.save(self.ancmt).$promise.then(function(data) {
          ServerService.registerMyAnnoncement(data.id);
          $state.go('app.ancmts');
        }, function(error) {
          console.log('damned... there was an error :', error);
        });
      }
    };


    var searchGame = function(gameName) {
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
        clearTimeout(self.autocompleteDelay);
        self.gamesList = "";
      }
    };

    self.clickListAutocomplete = function(item) {
      self.ancmt.game = item;
      self.gamesList = "";
    };

    self.takePicture = function() {
      navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        correctOrientation: true,
        targetWidth: 600
      });

      function onSuccess(imageData) {
        var image = document.getElementById('imgGame');
        image.src = "data:image/jpeg;base64," + imageData;
        self.ancmt.img =  image.src;
      }

      function onFail(message) {
        alert('Failed because: ' + message);
      }

    };

  });
