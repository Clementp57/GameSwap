'use strict';

/**
 * @ngdoc function
 * @name GameSwap.controller:EventController
 * @description
 * # EventController
 */
angular.module('GameSwap')
    .controller('EventController', function(eventPromise, EventService, ServerService) {
        var self = this;
        self.events = [];
    
        self.events = eventPromise;

      /*  EventService.query().$promise.then(function(events)  {
            self.events = events;

                // var event = self.events[0];
                // EventService.addComment({
                //     authorId: ServerService.getLoggedUser()._id,
                //     content: "coucou",
                //     date: new Date(),
                //     eventId: event._id,
                //     authorPicture: ServerService.getLoggedUser().picture
                // }).$promise.then(function(data) {
                //     console.log('added comment !!!');
                //     EventService.getAllComments({
                //         id: event._id
                //     }).$promise.then(function(comments) {
                //         console.log('got comments !', comments);
                //     });
                // });
        });*/


    });