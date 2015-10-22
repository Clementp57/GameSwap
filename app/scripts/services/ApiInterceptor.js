'use strict';

angular.module('GameSwap').service('ApiInterceptor', function($rootScope, $window) {
    var service = this;

    service.request = function(config) { 
        if(config.url.indexOf('/api/v1') > -1) { // Call ApiService to get endpoint
            console.log($window.localStorage);
            var server_token = $window.localStorage.server_token;

            if (server_token) {
                config.headers['x-access-token'] = server_token;
            } 
        }
        console.info('Request interceptor => URL: ',config.headers);
        return config;
    };

    service.responseError = function(response) {
        if (response.status === 401) {
            $rootScope.$broadcast('unauthorized');
        }
        return response;
    };
})