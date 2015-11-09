'use strict';

/**
 * @ngdoc function
 * @name GameSwap.controller:myAncmtController
 * @description
 * # myAncmtController
 */
angular.module('GameSwap')
  .controller('MyAncmtController', function(ServerService, AncmtService, $q, $ionicPopup) {
    var self = this;
    self.noData = false;

    
    this.getAllMyAncmt = function() {
      self.myAncmts = [];
      self.noData = false;
      AncmtService.getUserAnnoncements(ServerService.getLoggedUser()._id).$promise.then(function(data) {
        if(data == []) {
          self.noData = true;
        } else {
          self.myAncmts = data;  
        }
      });
    };

    this.getAllMyAncmt();

    this.confirmDelete = function(id) {
      var confirmPopup = $ionicPopup.confirm({
        title: "Suppression de l'offre",
        template: 'Êtes vous sur de vouloir supprimer cette offre ?'
      });
      confirmPopup.then(function(res) {
        if (res) {
          self.deleteAnnoncement(id);
        } else {
          return;
        }
      });
    };

    this.deleteAnnoncement = function(id) {
      AncmtService.delete({
        'id': id
      }).$promise.then(function(data) {
        console.log("Annoncment remove !");
      });
      ServerService.removeFromMyAnnoncement(id);
      this.getAllMyAncmt();
    };

  });
