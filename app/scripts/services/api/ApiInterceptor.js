'use strict';

angular.module('GameSwap').service('ApiInterceptor', function($rootScope, $window) {
    var service = this;

    service.request = function(config) { 
        if(config.url.indexOf('/api/v1') > -1) { // Call ApiService to get endpoint
            var token = $window.localStorage.server_token;
            var email = JSON.parse($window.localStorage.logged_user).email;

            if (token && email) {
                config.headers['x-access-token'] = token;
                config.headers['x-email'] = email;
            } 
        }
        return config;
    };

    // service.responseError = function(response) {
    //     if (response.status === 401) {
    //         $rootScope.$broadcast('unauthorized');
    //     }
    //     return response;
    // };
})