angular.module('GameSwap').directive('stopEvent', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            element.bind('click', function (e) {
                e.preventDefault(); // added for ionic
                e.stopPropagation();
            });
        }
    };
});