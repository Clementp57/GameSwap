'use strict';

/**
 * @ngdoc function
 * @name GameSwap.controller:AncmtController
 * @description
 * # AncmtController
 */
angular.module('GameSwap')
  .controller('AncmtController', function($scope, ServerService, UserService, AncmtService, GameService, $q) {
    var self= this;
    self.ancmts = [];

    self.tblFavoris = ServerService.getFavorisAnnoncement().split(',');
    
    this.setFavorisAnnoncement = function(id){
        if(self.tblFavoris){
            for(var i = 0, l = self.tblFavoris.length; i < l; ++i){
                if(self.tblFavoris[i] == id) return;
            }  
        }
        ServerService.registerFavorisAnnoncement(id);
    };
    
    this.checkIfFavoris = function(id){
        if(self.tblFavoris){
            for(var i = 0, l = self.tblFavoris.length; i < l; ++i){
                if(self.tblFavoris[i] == id) return true;
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

    this.doRefresh();

  });
