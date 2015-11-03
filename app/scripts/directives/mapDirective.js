angular.module('GameSwap')
    .directive('map', function(GeolocationService) {
        return {
            restrict: 'EA', //E = element, A = attribute, C = class, M = comment         
            scope: {
                //@ reads the attribute value, = provides two-way binding, & works with functions
                coords: '@',
                title: '@',
                description: '@',
                imageUrl: '@'
            },
            template: '<div id="map"></div>',
            link: function($scope, element, attrs) {
                L.mapbox.accessToken = 'pk.eyJ1IjoibXhpbWUiLCJhIjoiNWQ1cDZUcyJ9.SbzQquPm3IbTZluO90hA6A';
                var map = L.mapbox.map('map')
                    .setView([48.855584, 2.354613], 14)
                    .addLayer(L.mapbox.tileLayer('mapbox.streets'));

                // Localizing user
                GeolocationService.getCurrentPosition().then(function(position) {
                    var lat = position.coords.latitude;
                    var lon = position.coords.longitude;
                    map.setView([lat, lon], 16);
                    L.marker([lat, lon]).addTo(map);
                });
            }
        }
    });