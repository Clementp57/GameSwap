'use strict';

/**
 * @ngdoc function
 * @name GameSwap.controller:FavAncmtController
 * @description
 * # FavAncmtController
 */
angular.module('GameSwap')
  .controller('FavorisAncmtController', function($scope, favAncmtPromise, ServerService, AncmtService, $q) {
    var self = this;
    self.favAncmts = [];

    self.favAncmts = favAncmtPromise;

    self.noData = false;

    if (self.favAncmts) {
      self.noData = false;
    } else {
      self.noData = true;
    }


    this.doRefresh = function() {
      if (ServerService.getFavorisAnnoncement()) {
        var tblFavAncmt = ServerService.getFavorisAnnoncement().split(',');
        self.favAncmts = [];
        for (var i = 0, l = tblFavAncmt.length; i < l; ++i) {
          AncmtService.get({
            'id': tblFavAncmt[i]
          }).$promise.then(function(data) {
            self.favAncmts.push(data);
          });
        }
      }
      $scope.$broadcast('scroll.refreshComplete');
    };

  });
