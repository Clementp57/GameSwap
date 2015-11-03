'use strict';

/**
 * @ngdoc function
 * @name GameSwap.serive:GeolocationService
 * @description
 * # GeolocationService
 */
angular.module('GameSwap')
	// use factory for services
	.factory('GeolocationService', function($q, $ionicLoading, $ionicPlatform) {
		var posOptions = {
			timeout: 31000,
			enableHighAccuracy: true,
			maximumAge: 90000
		};

		var locationService = navigator.geolocation; 

		return {
			getCurrentPosition: function() {
				var deferred = $q.defer();
				$ionicPlatform.ready(function() {
					locationService
						.getCurrentPosition(function(position)  {
							console.log('got it!');
							deferred.resolve(position);
						}, function(error) {
							//
							console.log('error', error);
						});

				}, function(error) {
					$ionicLoading.show({
						template: 'Impossible de vous localiser, merci de réessayer.',
						duration: 1500
					});
					deferred.reject();
				});

				return deferred.promise;
			},
			getPositionFromAddress: function(location) {
				var geocoder = new google.maps.Geocoder();
				var deferred = $q.defer();

				geocoder.geocode({
						'address': location
					},
					function(results, status) {
						if (status == google.maps.GeocoderStatus.OK) {
							var res = results[0];
							if (res) {
								var position = {
									coords: {
										longitude: res.geometry.location.D,
										latitude: res.geometry.location.k
									}
								};
								deferred.resolve(position);
							};
						} else {
							$ionicLoading.show({
								template: 'Impossible de localiser l\'adresse fournie. Merci de la vérifier.',
								duration: 2000
							});
							deferred.reject();
						}
					},
					function(err) {
						$ionicLoading.show({
							template: 'Impossible de localiser cette adresse, merci de vérifier puis de réessayer.',
							duration: 1500
						});
						deferred.reject();
					});

				return deferred.promise;
			},
			getAddressFromPosition: function(position) {
				var geocoder = new google.maps.Geocoder();
				var deferred = $q.defer();

				var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

				geocoder.geocode({
						'latLng': latlng
					},
					function(results, status) {
						if (status == google.maps.GeocoderStatus.OK) {
							if (results[0]) {
								deferred.resolve(results[0].formatted_address);
							}
						} else {
							deferred.reject();
						}
					},
					function(err) {
						deferred.reject();
					});

				return deferred.promise;
			},
			computeRoute: function(startPosition, endPosition, travelMode) {
				var directionsService = new google.maps.DirectionsService();
				var deferred = $q.defer();
				var mode = google.maps.TravelMode[travelMode];

				var request = {
					origin: startPosition,
					destination: endPosition,
					travelMode: mode
				};
				directionsService.route(request, function(result, status) {
					if (status == google.maps.DirectionsStatus.OK) {
						deferred.resolve(result);
					}
				}, function(error) {
					deferred.reject();
				});

				return deferred.promise;
			}
		}
	});