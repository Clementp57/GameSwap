'use strict';

/**
 * @ngdoc function
 * @name GameSwap.controller:FavAncmtController
 * @description
 * # FavAncmtController
 */
angular.module('GameSwap')
  .controller('FavorisAncmtController', function(favAncmtPromise, ServerService, AncmtService, $q) {
    var self = this;
    self.favAncmts = [];
    
    self.favAncmts = favAncmtPromise;

    self.noData = false;

    if (self.favAncmts) {
      self.noData = false;
    } else {
      self.noData = true;
    }


  });
