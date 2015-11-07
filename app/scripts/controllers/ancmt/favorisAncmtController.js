'use strict';

/**
 * @ngdoc function
 * @name GameSwap.controller:FavAncmtController
 * @description
 * # FavAncmtController
 */
angular.module('GameSwap')
  .controller('FavorisAncmtController', function(eventPromise, ServerService, AncmtService, $q) {
    var self = this;
    self.favAncmts = [];
    
    self.favAncmts = eventPromise;

    self.noData = false;

    if (self.favAncmts) {
      self.noData = false;
    } else {
      self.noData = true;
    }


  });
