'use strict';

/**
 * @ngdoc overview
 * @name GameSwap
 * @description
 * # Initializes main application and routing
 *
 * Main module of the application.
 */


angular.module('GameSwap', ['ionic',
  'ngCordova',
  'ngResource',
  'angularMoment',
  'ionic-datepicker'
])

.run(function($ionicPlatform, $rootScope, $state, ServerService, $stateParams, amMoment) {

  // Moment
  amMoment.changeLocale('fr');

  // Handle global events
  $rootScope.$on('unauthorized', function() {
    $state.go('login');
  });

  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
    if (toState.authenticate && !ServerService.isLogged()) {
      event.preventDefault();
      // User isn’t authenticated, we redirect him to login
      $state.go("login");
    }

    if (toState.url == '/login') {
      ServerService.initialize().then(function() {
        // If ServerService initialized with success (nb: User already
        // has a token and it is valid) we go directly to home page
        $state.go('app.home');
      }); // No catch there so that if ServerService did not find a token, we stay on login page
    }

  });



  $ionicPlatform.ready(function() {
    // Plugin stuffs
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
    .state('app.ancmts', {
      url: '/annoncements',
      views: {
        'viewContent': {
          templateUrl: 'templates/views/ancmt/ancmts.html',
          controller: 'AncmtController as ctrl'
        }
      },
      authenticate: true
    })
    .state('app.ancmt', {
      url: "/annoncement/:id",
      views: {
        'viewContent': {
          templateUrl: 'templates/views/ancmt/ancmtDetail.html',
          controller: 'AncmtDetailController as ctrl'
        }
      }
    })
    .state('app.events', {
      url: '/events',
      views: {
        'viewContent': {
          templateUrl: 'templates/views/event/events.html',
          controller: 'EventController as ctrl'
        }
      },
      authenticate: true
    })
    .state('app.createEvent', {
      url: '/createEvent',
      cache: true,
      views: {
        'viewContent': {
          templateUrl: 'templates/views/event/createEvent.html',
          controller: 'CreateEventController as ctrl'
        }
      },
      authenticate: true
    })
    .state('app.createAncmt', {
      url: '/createAnoncement',
      cache: true,
      views: {
        'viewContent': {
          templateUrl: 'templates/views/ancmt/createAncmt.html',
          controller: 'CreateAncmtController as ctrl'
        }
      },
      authenticate: true
    })
    .state('app.favAncmts', {
      url: '/favorisAnnoncement',
      views: {
        'viewContent': {
          templateUrl: 'templates/views/ancmt/myAncmt.html',
          controller: 'MyAncmtController as ctrl'
        }
      },
      authenticate: true
    });

  // redirects to default route for undefined routes
  $urlRouterProvider.otherwise('app/home');
});
