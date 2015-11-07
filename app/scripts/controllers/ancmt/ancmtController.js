'use strict';

/**
 * @ngdoc function
 * @name GameSwap.controller:AncmtController
 * @description
 * # AncmtController
 */
angular.module('GameSwap')
  .controller('AncmtController', function($scope, ancmtsPromise, ServerService, UserService, AncmtService, GameService, $q, $ionicFilterBar) {
    var self= this;
    self.ancmts = [];
    var tblFavoris;
    var filterBarInstance;

    self.filteredAncmts = ancmtsPromise;
    self.ancmts = ancmtsPromise;

    self.showFilterBar = function () {
      filterBarInstance = $ionicFilterBar.show({
        items: self.ancmts,
        update: function (filteredItems) {
          self.filteredAncmts = filteredItems;
        },
        filterProperties: ['title', 'game'],
      });
    };

    var updateFav = function(){
        if(ServerService.getFavorisAnnoncement())
        return ServerService.getFavorisAnnoncement().split(',');
    };
    
    this.setFavorisAnnoncement = function(id){
        tblFavoris = updateFav();
        if(tblFavoris){
            for(var i = 0, l = tblFavoris.length; i < l; ++i){
                if(tblFavoris[i] == id) return;
            }  
        }
        ServerService.registerFavorisAnnoncement(id);
    };
    
    this.checkIfFavoris = function(id){
        tblFavoris = updateFav();
        if(tblFavoris){
            for(var i = 0, l = tblFavoris.length; i < l; ++i){
                if(tblFavoris[i] == id) return true;
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
