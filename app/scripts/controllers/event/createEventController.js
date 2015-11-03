'use strict';

/**
 * @ngdoc function
 * @name GameSwap.controller:CreateEventController
 * @description
 * # CreateEventController
 */
angular.module('GameSwap')
  .controller('CreateEventController', function(GeolocationService, EventService, ServerService, DatepickerService) {
    var self = this;
    self.event = { coords : {}, details: ''};
    self.event.creatorId = ServerService.getLoggedUser()._id;

    self.datePicker = DatepickerService.getDateConfigurationObject();
    self.datePicker.callback = function(val) {
        self.event.date = val;
    };  

    self.locate = function() {
    	GeolocationService.getCurrentPosition().then(function(position) {
            self.event.coords = {
                lat: position.coords.latitude,
                lon: position.coords.longitude
            };
    		GeolocationService.getAddressFromPosition(position).then(function(adress) {
                self.event.locationName = adress;
    		});
    	});
    };

    self.validateEvent = function(isValid) {
        if(isValid) {
            //register
            delete self.event.locationName;
            EventService.save(self.event).$promise.then(function() {
              console.log('TODO: redirect');
            }, function(error) {
              console.log('damned... there was an error :' + error);
            });
        }
    };
  });
