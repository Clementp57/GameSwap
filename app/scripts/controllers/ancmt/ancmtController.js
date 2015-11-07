'use strict';

/**
 * @ngdoc function
 * @name GameSwap.controller:AncmtController
 * @description
 * # AncmtController
 */
angular.module('GameSwap')
  .controller('AncmtController', function($state, $scope, ancmtsPromise, ServerService, UserService, AncmtService, GameService, $q, $ionicFilterBar) {
    var self = this;
    self.ancmts = [];
    var tblFavoris;
    var filterBarInstance;
    var tblMyAncmt = [];

    if (ServerService.getMyAnnoncement()) {
      tblMyAncmt = ServerService.getMyAnnoncement().split(',');
    }

    self.filteredAncmts = ancmtsPromise;
    self.ancmts = ancmtsPromise;

    self.showFilterBar = function() {
      filterBarInstance = $ionicFilterBar.show({
        items: self.ancmts,
        update: function(filteredItems) {
          self.filteredAncmts = filteredItems;
        },
        filterProperties: ['title', 'game'],
      });
    };

    self.createAncmt = function() {
      $state.go('app.createAncmt');
    }

    this.checkMyAncmt = function(id) {
      for (var i = 0, l = tblMyAncmt.length; i < l; ++i) {
        if (tblMyAncmt[i] == id) return false;
      }
      return true;
    }

    var updateFav = function() {
      if (ServerService.getFavorisAnnoncement())
        return ServerService.getFavorisAnnoncement().split(',');
    };

    this.setFavorisAnnoncement = function(id) {
      tblFavoris = updateFav();
      if (tblFavoris) {
        for (var i = 0, l = tblFavoris.length; i < l; ++i) {
          if (tblFavoris[i] == id) {
            ServerService.removeFromFavoris(id);
            return;
          }
        }
      }
      ServerService.registerFavorisAnnoncement(id);
    };

    this.checkIfFavoris = function(id) {
      tblFavoris = updateFav();
      if (tblFavoris) {
        for (var i = 0, l = tblFavoris.length; i < l; ++i) {
          if (tblFavoris[i] == id) return true;
        }
      }
      return;
    };

    this.doRefresh = function() {
      AncmtService.query().$promise.then(function(data) {
        self.ancmts = data;
      });
      $scope.$broadcast('scroll.refreshComplete');
    };

  });
