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

    this.getAllMyAncmt = function() {
      self.myAncmts = [];
      if (ServerService.getMyAnnoncement()) {
        var tblMyAncmt = ServerService.getMyAnnoncement().split(',');
        for (var i = 0, l = tblMyAncmt.length; i < l; ++i) {
          AncmtService.get({
            'id': tblMyAncmt[i]
          }).$promise.then(function(data) {
            self.myAncmts.push(data);
          });
        }
      }
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
