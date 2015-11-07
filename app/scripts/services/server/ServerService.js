'use strict';

/**
 * @ngdoc function
 * @name GameSwap.serive:LoginService
 * @description
 * # ExampleService
 */
angular.module('GameSwap')
// use factory for services
.factory('ServerService', function($resource, ApiService, $http, $window, $q) {
  var _initialized = false;
  var loginEndPoint = ApiService.getLoginEndPoint();
  var registerEndPoint = ApiService.getRegisterEndPoint();
  var tokenCheckEndPoint = ApiService.getTokenCheckEndPoint();
  var isLogged = false;

  this.initialize = function() {
    var deferred = $q.defer();
    if (isLogged) {
      deferred.resolve();
    }
    if ($window.localStorage.server_token) {
      this.checkTokenValidity().then(function() {
        isLogged = true;
        deferred.resolve();
      }, function() {
        deferred.reject();
      });
    } else {
      deferred.reject();
    }
    return deferred.promise;
  };

  this.checkTokenValidity = function() {
    var deferred = $q.defer();
    var token = $window.localStorage.server_token || null;
    if (token) {
      var config = {
        headers: {
          'x-access-token': token
        }
      };

      $http.post(tokenCheckEndPoint, config).success(function(response) {
        console.log('token ok');
        deferred.resolve();
      }).error(function(error) {
        console.error('Token is no longer valid');
        deferred.reject();
      });
    } else {
      deferred.reject();
    }
    return deferred.promise;
  };

  this.logUser = function(email) {
    if (!email) {
      throw 'No email specified';
      return;
    }
    var deferred = $q.defer();

    var data = JSON.stringify({
      email: email
    });

    $http.post(loginEndPoint, data).success(function(response) {
      $window.localStorage.server_token = response.token;
      $window.localStorage.logged_user = JSON.stringify(response.user);
      isLogged = true;
      deferred.resolve();
    }).error(function(error) {
      console.error('failed to log user : ', error);
      deferred.reject();
    });

    return deferred.promise;

  };

  this.logOut = function() {
    $window.localStorage.clear();
    isLogged = false;
  };

  this.registerUser = function(user) {
    if (!user) {
      throw 'No user specified';
      return;
    }

    var deferred = $q.defer();

    var data = JSON.stringify(user);
    console.log("Registering User =>", user);
    $http.post(registerEndPoint, data).success(function(response) {
      console.log(response);
      $window.localStorage.server_token = response.token;
      $window.localStorage.logged_user = JSON.stringify(response.user);
      isLogged = true;
      deferred.resolve();
    }).error(function(error) {
      console.error('failed to register user : ', error);
      deferred.reject();
    });

    return deferred.promise;
  };

  this.isLogged = function() {
    return isLogged;
  };

  this.getLoggedUser = function() {
    return JSON.parse($window.localStorage.logged_user);
  };
  // FAVORIS ANNONCEMENT
  this.registerFavorisAnnoncement = function(id) {
    if (!id) {
      throw 'No user specified';
      return;
    }

    if ($window.localStorage.favoris_annoncement) {
      var tblFavoris = $window.localStorage.favoris_annoncement.split(',');
      for (var i = 0, l = tblFavoris.length; i < l; ++i) {
        if (tblFavoris[i] == id) {
          return;
        }
      }
      tblFavoris.push(id);
      $window.localStorage.favoris_annoncement = tblFavoris;
    } else {
      $window.localStorage.favoris_annoncement = id;
    }

  };

  this.getFavorisAnnoncement = function() {
    return $window.localStorage.favoris_annoncement;
  };
  this.removeFromFavoris = function(id) {
    if ($window.localStorage.favoris_annoncement) {
      var tblFav = $window.localStorage.favoris_annoncement.split(',');
      var pos;
      for (var i = 0, l = tblFav.length; i < l; ++i) {
        if (tblFav[i] == id) {
          pos = i;
        }
      }
      tblFav.splice(pos, 1);
      $window.localStorage.favoris_annoncement = tblFav;
    }
  };
  //MES ANNONCES
  this.registerMyAnnoncement = function(id) {
    if (!id) {
      throw 'No user specified';
      return;
    }

    if ($window.localStorage.my_annoncement) {
      var tblMyAncmt = $window.localStorage.my_annoncement.split(',');
      tblMyAncmt.push(id);
      $window.localStorage.my_annoncement = tblMyAncmt;
    } else {
      $window.localStorage.my_annoncement = id;
    }

  };

  this.getMyAnnoncement = function() {
    return $window.localStorage.my_annoncement;
  };

  this.removeFromMyAnnoncement = function(id) {
    if ($window.localStorage.my_annoncement) {
      var tblMyAncmt = $window.localStorage.my_annoncement.split(',');
      var pos;
      for (var i = 0, l = tblMyAncmt.length; i < l; ++i) {
        if (tblMyAncmt[i] == id) {
          pos = i;
        }
      }
      tblMyAncmt.splice(pos, 1);
      $window.localStorage.my_annoncement = tblMyAncmt;
    }
  };

  return this;
});
