'use strict';

/**
 * @ngdoc function
 * @name GameSwap.controller:FavAncmtController
 * @description
 * # FavAncmtController
 */
angular.module('GameSwap')
  .controller('FavorisAncmtController', function(ServerService, AncmtService, $q) {
    var self = this;

    this.getAllFav = function() {
      self.noData = false;
      self.favAncmts = [];
      if (ServerService.getFavorisAnnoncement()) {
        self.noData = false;
        var tblFavAncmt = ServerService.getFavorisAnnoncement().split(',');

        for (var i = 0, l = tblFavAncmt.length; i < l; ++i) {
          AncmtService.get({
            'id': tblFavAncmt[i]
          }).$promise.then(function(data) {
            self.favAncmts.push(data);
          });
        }
      } else {
        self.noData = true;
      }
    };

    this.getAllFav();

  });
