'use strict';

/**
 * @ngdoc function
 * @name GameSwap.controller:AncmtDetailController
 * @description
 * # AncmtDetailController
 */
angular.module('GameSwap')
  .controller('AncmtDetailController', function(UserService, AncmtService, $stateParams, ancmtPromise) {
    var self = this;
    self.ancmt = ancmtPromise;

    UserService.get({
        id: self.ancmt.creatorId
      }).$promise.then(function(user) {
        self.author = user;
      });
      
    self.sendMail = function() {
      if (window.plugins && window.plugins.emailComposer) {
        window.plugins.emailComposer.showEmailComposerWithCallback(function(result) {
            console.log("Response -> " + result);
          },
          "Re:" + self.ancmt.title, // Subject
          "", // Body
          [self.author.email], // To
          null, // CC
          null, // BCC
          false, // isHTML
          null, // Attachments
          null); // Attachment Data
      } else {
        console.log('Cannot send mail from browser !!');
      }
    };


  });
