'use strict';

/**
 * @ngdoc function
 * @name GameSwap.controller:CreateEventController
 * @description
 * # CreateEventController
 */
angular.module('GameSwap')
  .controller('CreateEventController', function(GeolocationService, EventService, ServerService, DatepickerService, $filter, $rootScope) {
    var self = this;
    self.event = { coords : {}, details: '', userPic: $rootScope.userPic};
    self.event.creatorId = ServerService.getLoggedUser()._id;

    self.datePicker = DatepickerService.getDateConfigurationObject();
    self.datePicker.callback = function(val) {
        self.event.date = new Date(val).toISOString();   
        self.eventPrettyDate = $filter('amDateFormat')(val, 'dddd Do MMMM YYYY');
    };  

    self.getPictureFromGallery = function() {
        var config = {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
            correctOrientation: true
          };
        navigator.camera.getPicture(function(data){
            console.log('got photo !');
            self.event.poster = "data:image/jpeg;base64," + data;
            document.getElementById("eventPoster").src = self.event.poster;
        }, function(fail) {
            console.log(fail);
        }, config);
    };

    self.locationChanged = function() {
        var locationName = self.event.locationName.formatted_address;
        GeolocationService.getPositionFromAddress(locationName).then(function(position) {
            self.event.coords = {
                lat: position.coords.latitude,
                lon: position.coords.longitude
            };
            self.event.locationName = locationName;
        });
    };

    self.validateEvent = function(isValid) {
        if(isValid) {
            //register
            self.event.creationDate = new Date();
            console.log(self.event);
            EventService.save(self.event).$promise.then(function() {
              console.log('TODO: redirect');
            }, function(error) {
              console.log('damned... there was an error :' + error);
            });
        }
    };
  });
