'use strict';

/**
 * @ngdoc function
 * @name GameSwap.controller:EventController
 * @description
 * # EventController
 */
angular.module('GameSwap')
  .controller('EventController', function(EventService) {
    var self = this;
    self.events = [];

    EventService.query().$promise.then(function(events) {
      	self.events = events;
    });
  });
