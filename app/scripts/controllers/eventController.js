'use strict';

/**
 * @ngdoc function
 * @name GameSwap.controller:EventController
 * @description
 * # EventController
 */
angular.module('GameSwap')
  .controller('EventController', function($scope, UserService, EventService, GameService) {
    this.users = [];
    this.game = [];


    // $scope.googleLogin();
    /*GameService.getAllGames().then(function(data) {
        console.log('Got datas from api ! =>', data);
    });*/

    this.getAllEvents = function() {
      //EventService.query().$promise.then(function(event) {
       // console.log(ancmt);
          /* a supprimer */
          var event = [{title : "Moi et mes coupains", img : "https://c2.staticflickr.com/4/3115/2873854099_89af11dbe1.jpg"},{title : "On s'enjaille ?", img : "http://www.brain-magazine.fr/images/stories/PAGE_PUTE_6/GEEK/dorkathon-5-lan-party-11.jpg"}];
          /* */
          $scope.events = event;

      //});
    }

    this.getAllEvents();
  });
