angular.module('GameSwap')
    .directive('map', function(GeolocationService, $timeout) {
        return {
            restrict: 'EA', //E = element, A = attribute, C = class, M = comment         
            scope: {
                //@ reads the attribute value, = provides two-way binding, & works with functions
                markerLat: '@',
                markerLon: '@',
                markerContent: '@',
                autolocate: '@',
                events: '='
            },
            template: '<div id="map" data-tap-disabled="true"></div>',
            link: function($scope, element, attrs) {
                L.mapbox.accessToken = 'pk.eyJ1IjoibXhpbWUiLCJhIjoiNWQ1cDZUcyJ9.SbzQquPm3IbTZluO90hA6A';
                console.log(attrs);
                var initialize = function() {
                    var map = L.mapbox.map('map').setView([48.855584, 2.354613], 12)
                        .addLayer(L.mapbox.tileLayer('mapbox.streets'));

                    if (!attrs.autolocate || attrs.autolocate) {
                        //Localizing user
                        GeolocationService.getCurrentPosition().then(function(position) {
                            var lat = position.coords.latitude;
                            var lon = position.coords.longitude;
                            addMarkerAndCenter(lat, lon, 'Ma position', true);
                        });
                    }

                    if (attrs.markerLat && attrs.markerLon) {
                        addMarkerAndCenter(attrs.markerLon, attrs.markerLat, attrs.markerContent);
                    }

                    $scope.$watch('events', function(events) {
                        angular.forEach(events, function(event, key) {
                            addMarker(event.coords.lon, event.coords.lat, event.title);
                        });
                    });

                    function addMarkerAndCenter(lat, lon, content, myPosition) {
                        map.setView([lat, lon], 12);
                        addMarker(lat, lon, content, myPosition);
                    }

                    function addMarker(lat, lon, content, myPosition) {
                        var marker = L.marker([lat, lon]).bindPopup(content).addTo(map);
                        if(!myPosition) {
                            marker.setIcon(L.icon({
                                "iconUrl": "/images/icon.png",
                                "iconSize": [25, 25], // size of the icon
                                "iconAnchor": [12, 12], // point of the icon which will correspond to marker's location
                                "popupAnchor": [0, -12], // point from which the popup should open relative to the iconAnchor
                                "className": "dot" 
                            }));
                        }
                    }
                }

                $timeout(initialize, 500);

                



                


            }
        }
    });