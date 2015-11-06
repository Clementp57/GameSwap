'use strict';
/*
*
*
*   FILTER NO SPACE
*
*/

angular.module('GameSwap')
  .filter('nospace', function() {
    return function(value) {
      return (!value) ? '' : value.replace(/ /g, '');
    };
  });
