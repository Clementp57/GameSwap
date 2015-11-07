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
  'ionic-datepicker',
  'jett.ionic.filter.bar'
])

.run(function($ionicPlatform, $rootScope, $state, ServerService, $stateParams, amMoment, $ionicLoading) {

  // Moment
  amMoment.changeLocale('fr');

  // Handle global events
  $rootScope.$on('unauthorized', function() {
    $state.go('login');
  });

  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
    $ionicLoading.show({
      template: '<ion-spinner icon="ripple"></ion-spinner>'
    });
    if (toState.authenticate && !ServerService.isLogged()) {
      event.preventDefault();
      // User isn’t authenticated, we redirect him to login
      $state.go("login");
    }

    if (toState.url == '/login') {
      ServerService.initialize().then(function() {
        // If ServerService initialized with success (nb: User already
        // has a token and it is valid) we go directly to annoncement page
        $state.go('app.ancmts');
      }); // No catch there so that if ServerService did not find a token, we stay on login page
    }

  });

  $rootScope.$on('$stateChangeSuccess', function() {
    $ionicLoading.hide();
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
    .state('app.ancmts', {
      url: '/annoncements',
      views: {
        'viewContent': {
          templateUrl: 'templates/views/ancmt/ancmts.html',
          controller: 'AncmtController as ctrl'
        }
      },
      resolve: {
        ancmtsPromise: function(AncmtService) {
          return AncmtService.query().$promise;
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
      },
      resolve: {
        ancmtPromise: function(AncmtService, $stateParams) {
          return AncmtService.get({
            'id': $stateParams.id
          }).$promise;
        }
      },
      authenticate: true
    })
    .state('app.events', {
      url: '/events',
      views: {
        'viewContent': {
          templateUrl: 'templates/views/event/events.html',
          controller: 'EventController as ctrl'
        }
      },
      resolve: {
        eventsPromise: function(EventService) {
          return EventService.query().$promise;
        }
      },
      authenticate: true
    })
    .state('app.createEvent', {
      url: '/event/createEvent',
      views: {
        'viewContent': {
          templateUrl: 'templates/views/event/createEvent.html',
          controller: 'CreateEventController as ctrl'
        }
      },
      authenticate: true
    })
    .state('app.event', {
      url: "/event/:id",
      views: {
        'viewContent': {
          templateUrl: 'templates/views/event/eventDetail.html',
          controller: 'EventDetailController as ctrl'
        }
      },
      resolve: {
        eventPromise: function(EventService, $stateParams) {
          return EventService.get({
            'id': $stateParams.id
          }).$promise;
        }
      },
      authenticate: true
    })
    .state('app.createAncmt', {
      url: '/annoncements/createAnoncement',
      cache: false,
      views: {
        'viewContent': {
          templateUrl: 'templates/views/ancmt/createAncmt.html',
          controller: 'CreateAncmtController as ctrl'
        }
      },
      authenticate: true
    })
    .state('app.myAncmts', {
      url: '/myAnnoncement',
      views: {
        'viewContent': {
          templateUrl: 'templates/views/ancmt/myAncmt.html',
          controller: 'MyAncmtController as ctrl'
        }
      },
      authenticate: true
    })
    .state('app.favAncmts', {
      url: '/favorisAnnoncement',
      views: {
        'viewContent': {
          templateUrl: 'templates/views/ancmt/favorisAncmt.html',
          controller: 'FavorisAncmtController as ctrl'
        }
      },
      resolve: {
        eventPromise: function(ServerService, AncmtService) {
          if (ServerService.getFavorisAnnoncement()) {
            var tblFavAncmt = ServerService.FavorisAnnoncement().split(',');
            var dataFav = [];
            for (var i = 0, l = tblFavAncmt.length; i < l; ++i) {
              AncmtService.get({
                'id': tblFavAncmt[i]
              }).$promise.then(function(data) {
                console.log(data);
                dataFav.push(data);
              });
            }
            return dataFav;
          }
          return;
        }
      },
      authenticate: true
    })
    .state('app.favAncmt', {
      url: "/annoncement/:id",
      views: {
        'viewContent': {
          templateUrl: 'templates/views/ancmt/ancmtDetail.html',
          controller: 'AncmtDetailController as ctrl'
        }
      },
      resolve: {
        eventPromise: function(EventService, $stateParams) {
          return EventService.get({
            'id': $stateParams.id
          }).$promise;
        }
      },
      authenticate: true
    });

  // redirects to default route for undefined routes
  $urlRouterProvider.otherwise('app/annoncements');
});
