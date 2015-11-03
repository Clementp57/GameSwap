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

    this.setFavorisAnnconcement = function(id){
        if(ServerService.getFavorisAnnoncement()){
            var tblFavoris = ServerService.getFavorisAnnoncement().split(',');
            for(var i = 0, l = tblFavoris.length; i < l; ++i){
                if(tblFavoris[i] == id) return;
            }  
        }
        ServerService.registerFavorisAnnoncement(id);
    };
    
    this.doRefresh = function() {
      AncmtService.query().$promise.then(function(data) {
        self.ancmts = data;
      });
      $scope.$broadcast('scroll.refreshComplete');
    };

    this.doRefresh();

  });
