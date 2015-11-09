'use strict';

/**
 * @ngdoc function
 * @name GameSwap.controller:myAncmtController
 * @description
 * # myAncmtController
 */
angular.module('GameSwap')
  .controller('MyAncmtController', function(ServerService, AncmtService, $q, $ionicPopup, $scope) {
    var self = this;
    self.noData = false;
    var userId = ServerService.getLoggedUser()._id;
    
    this.getAllMyAncmt = function() {
      self.myAncmts = [];
      self.noData = false;
      AncmtService.getUserAnnoncements({id: userId}).$promise.then(function(data) {
        if(data.length < 1) {
          self.noData = true;
        } else {
          self.myAncmts = data;  
        }
        $scope.$broadcast('scroll.refreshComplete');  
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
