'use strict';

/**
 * @ngdoc function
 * @name GameSwap.controller:myAncmtController
 * @description
 * # myAncmtController
 */
angular.module('GameSwap')
  .controller('MyAncmtController', function(ServerService, AncmtService, $q) {
    var self = this;
    self.myAncmts = [];

    if (ServerService.getMyAnnoncement()) {
        
      var tblMyAncmt = ServerService.getMyAnnoncement().split(',');
        
      for (var i = 0, l = tblMyAncmt.length; i < l; ++i) {
        AncmtService.get({'id': tblMyAncmt[i]}).$promise.then(function(data) {
          self.myAncmts.push(data);
        });
        // Maybe we can handle this in one request (eg : getAllAncmt for an userId)
      }
    }

  });
