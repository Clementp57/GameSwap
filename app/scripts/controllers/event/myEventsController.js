'use strict';

/**
 * @ngdoc function
 * @name GameSwap.controller:myAncmtController
 * @description
 * # myAncmtController
 */
angular.module('GameSwap')
  .controller('MyEventsController', function(eventsPromise, ServerService, EventService, $q, $ionicPopup, $scope) {
    var self = this;
    self.noData = false;
    var userId = ServerService.getLoggedUser()._id;
    self.myEvents = eventsPromise;
    
    this.getAllMyEvent = function() {
      self.myEvents = [];
      self.noData = false;
      EventService.getUserEvents({id: userId}).$promise.then(function(data) {
        if(data.length < 1) {
          self.noData = true;
        } else {
          self.myEvents = data;  
        }
        $scope.$broadcast('scroll.refreshComplete');  
      });
    };

    this.confirmDelete = function(id) {
      var confirmPopup = $ionicPopup.confirm({
        title: "Suppression de l'évenement",
        template: 'Êtes vous sur de vouloir supprimer cet évenement ?'
      });
      confirmPopup.then(function(res) {
        if (res) {
          self.deleteEvent(id);
        } else {
          return;
        }
      });
    };

    this.deleteEvent = function(id) {
      EventService.delete({
        'id': id
      }).$promise.then(function(data) {
        console.log("Annoncment remove !");
      });
      this.getAllMyEvent();
    };

  });
