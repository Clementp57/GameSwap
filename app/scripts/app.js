'use strict';

/**
 * @ngdoc overview
 * @name GameSwap
 * @description
 * # Initializes main application and routing
 *
 * Main module of the application.
 */


angular.module('GameSwap', ['ionic', 'ngCordova', 'ngResource'])

  .run(function($ionicPlatform, $rootScope, $state) {

    // Handle global events
    $rootScope.$on('unauthorized', function() {
      $state.go('app.login');
    });


    $ionicPlatform.ready(function() {
      // save to use plugins here
    });

    // add possible global event handlers here

  })

  .config(function($httpProvider, $stateProvider, $urlRouterProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    // Http Interceptors
    $httpProvider.interceptors.push('ApiInterceptor');  

    

    // Application routing
    $stateProvider
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/main.html',
        controller: 'MainController as ctrl'
      })
      .state('app.login', {
        url: '/login',
        views: {
          'viewContent': {
            templateUrl: 'templates/views/login.html',
            controller: 'LoginController as ctrl'
          }
        }
      })
      .state('app.home', {
        url: '/home',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'templates/views/home.html',
            controller: 'HomeController as ctrl'
          }
        }
      })
      .state('app.settings', {
        url: '/settings',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'templates/views/settings.html',
            controller: 'SettingsController as ctrl'
          }
        }
      })
    .state('app.ancmt', {
        url: '/annoncements',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'templates/views/ancmt.html',
            controller: 'AncmtController as ctrl'
          }
        }
      });


    // redirects to default route for undefined routes
    $urlRouterProvider.otherwise('/app/login');
  });


