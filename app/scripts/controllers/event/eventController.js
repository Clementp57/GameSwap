'use strict';

/**
 * @ngdoc function
 * @name GameSwap.controller:EventController
 * @description
 * # EventController
 */
angular.module('GameSwap')
    .controller('EventController', function(EventService, ServerService, $ionicPopup, $scope) {
        var self = this;
    
        self.events = eventPromise;
        self.eventsCoords = null;

        self.showEventsMap = function(){
            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                template: '<map autolocate="true" events="ctrl.events"></map>',
                title: "Evenements sur la map",
                cssClass: 'mapPopup',
                // subTitle: 'Please use normal things',
                scope: $scope,
                buttons: [{
                    text: 'Fermer'
                }]
            });
            myPopup.then(function(res) {
                console.log('Closed!', res);
            });
        };

    });