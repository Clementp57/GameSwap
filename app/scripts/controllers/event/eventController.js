'use strict';

/**
 * @ngdoc function
 * @name GameSwap.controller:EventController
 * @description
 * # EventController
 */
angular.module('GameSwap')
    .controller('EventController', function($state, eventsPromise, EventService, ServerService, $ionicPopup, $scope, $ionicFilterBar) {
        var self = this;
        var filterBarInstance;
        self.events = eventsPromise;
        self.filteredEvents = eventsPromise;

        self.doRefresh = function() {
            EventService.query().$promise.then(function(events) {
                self.events = events;
                self.filteredEvents = events;
                $scope.$broadcast('scroll.refreshComplete');
            });
        }

        self.createEvent = function() {
            $state.go('app.createEvent');
        }

        self.showFilterBar = function () {
          filterBarInstance = $ionicFilterBar.show({
            items: self.events,
            update: function (filteredItems) {
              self.filteredEvents = filteredItems;
            },
            filterProperties: ['title', 'game', 'description']
          });
        };

        self.showEventsMap = function(){
            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                template: '<map autolocate="true" events="ctrl.events"></map>',
                title: "Evenements sur la map",
                cssClass: 'mapPopup',
                // subTitle: 'Please use normal things',
                scope: $scope,
                buttons: [{
                    text: 'Fermer',
                    type: 'button-assertive'
                }]
            });
            myPopup.then(function(res) {
                console.log('Closed!', res);
            });
        };

    });