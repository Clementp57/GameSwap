angular.module('GameSwap')
    .directive('map', function(GeolocationService, $timeout) {
        return {
            restrict: 'EA', //E = element, A = attribute, C = class, M = comment         
            scope: {
                //@ reads the attribute value, = provides two-way binding, & works with functions
                marker: '@',
                autolocate: '@',
                events: '='
            },
            template: '<div id="map"></div>',
            link: function($scope, element, attrs) {
                L.mapbox.accessToken = 'pk.eyJ1IjoibXhpbWUiLCJhIjoiNWQ1cDZUcyJ9.SbzQquPm3IbTZluO90hA6A';
                var initialize = function() {
                    var map = L.mapbox.map('map').setView([48.855584, 2.354613], 12)
                        .addLayer(L.mapbox.tileLayer('mapbox.streets'));

                    if (!attrs.autolocate || attrs.autolocate) {
                        //Localizing user
                        GeolocationService.getCurrentPosition().then(function(position) {
                            var lat = position.coords.latitude;
                            var lon = position.coords.longitude;
                            addMarkerAndCenter(lat, lon);
                        });
                    }

                    if (attrs.marker && attrs.marker.lat && attrs.marker.lon) {
                        addMarkerAndCenter(attrs.marker.lat, attrs.marker.lon);
                    }

                    $scope.$watch('events', function(events) {
                        angular.forEach(events, function(event, key) {
                            addMarker(event.coords.lon, event.coords.lat, event.title);
                        });
                    });

                    function addMarkerAndCenter(lat, lon) {
                    map.setView([lat, lon], 14);
                    addMarker(lat, lon);
                    }

                    function addMarker(lat, lon, content) {
                        var marker = L.marker([lat, lon]).addTo(map);
                        if(content) {
                            marker.bindPopup(content).openPopup();
                        }
                    }
                }

                $timeout(initialize, 500);

                



                


            }
        }
    });