angular.module('GameSwap')
    .directive('map', function(GeolocationService) {
        return {
            restrict: 'EA', //E = element, A = attribute, C = class, M = comment         
            scope: {
                //@ reads the attribute value, = provides two-way binding, & works with functions
                marker: '@',
                autolocate: '@',
                description: '@',
                imageUrl: '@'
            },
            template: '<div id="map"></div>',
            link: function($scope, element, attrs) {
                L.mapbox.accessToken = 'pk.eyJ1IjoibXhpbWUiLCJhIjoiNWQ1cDZUcyJ9.SbzQquPm3IbTZluO90hA6A';
                var map = L.mapbox.map('map').setView([48.855584, 2.354613], 14)
                        .addLayer(L.mapbox.tileLayer('mapbox.streets'));;

                if(!attrs.autolocate || attrs.autolocate) {
                    // Localizing user
                    GeolocationService.getCurrentPosition().then(function(position) {
                        var lat = position.coords.latitude;
                        var lon = position.coords.longitude;
                        addMarkerAndCenter(lat, lon);
                    });
                }

                if(attrs.marker && attrs.marker.lat && attrs.marker.lon) {
                    addMarkerAndCenter(attrs.marker.lat, attrs.marker.lon);
                }



                function addMarkerAndCenter(lat, lon) {
                    map.setView([lat, lon], 16);
                    L.marker([lat, lon]).addTo(map);
                }
               
            }
        }
    });