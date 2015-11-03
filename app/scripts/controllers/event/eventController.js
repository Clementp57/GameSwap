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
    self.event = [];


    EventService.query().$promise.then(function(data) {
      self.events = data;
    });
  });
