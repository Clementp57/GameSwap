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

  .run(function($ionicPlatform, $rootScope, $state, ServerService) {

    // Handle global events
    $rootScope.$on('unauthorized', function() {
      $state.go('login');
    });

    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
      if(toState.url == '/login') {
        event.preventDefault();
        ServerService.initialize().then(function() {
          $state.go('app.home');
        }, function() {
          $state.go('login')
        });
      }

      if (toState.authenticate && !ServerService.isLogged()){
        // User isn’t authenticated
        console.info('Restricted route, redirecting to login');
        $state.go("login");
        event.preventDefault(); 
      }
    });



    $ionicPlatform.ready(function() {
      
    });

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
        controller: 'MainController as ctrl',
        authenticate: true
      })
      .state('login', {
        url: '/login',
        abstract: false,
        templateUrl: 'templates/views/login.html',
        controller: 'LoginController as ctrl'
        
      })
      .state('app.home', {
        url: '/home',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'templates/views/home.html',
            controller: 'HomeController as ctrl'
          }
        },
        authenticate: true
      })
      .state('app.settings', {
        url: '/settings',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'templates/views/settings.html',
            controller: 'SettingsController as ctrl'
          }
        },
        authenticate: true
      })
    .state('app.ancmt', {
        url: '/annoncements',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'templates/views/ancmts.html',
            controller: 'AncmtController as ctrl'
          }
        },
        authenticate: true
      })
    .state('app.event', {
        url: '/events',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'templates/views/events.html',
            controller: 'EventController as ctrl'
          }
        },
        authenticate: true
      });


    // redirects to default route for undefined routes
    $urlRouterProvider.otherwise('app/home');
  });


