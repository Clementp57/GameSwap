'use strict';

/**
 * @ngdoc function
 * @name GameSwap.controller:AncmtDetailController
 * @description
 * # AncmtDetailController
 */
angular.module('GameSwap')
	.controller('EventDetailController', function(eventPromise, $scope, UserService, $ionicPopup) {
		var self = this;

		self.event = eventPromise;

		UserService.get({id : self.event.creatorId}).$promise.then(function(user) {
			self.author = user;
		});


		self.showMapPopup = function() {
			// An elaborate, custom popup
			var myPopup = $ionicPopup.show({
				template: '<map autolocate="false" marker-content="'+ self.event.title+'" marker-lat="'+self.event.coords.lat+'" marker-lon="'+self.event.coords.lon+'"></map>',
				title: self.event.title,
				cssClass: 'mapPopup',
				// subTitle: 'Please use normal things',
				scope: $scope,
				buttons: [{
					text: 'Fermer',
                    type: 'button-assertive'
				}]
			});
			myPopup.then(function(res) {
				console.log('Closed!', res);
			});
		};

		self.sendMail = function() {
			 if(window.plugins && window.plugins.emailComposer) {
	            window.plugins.emailComposer.showEmailComposerWithCallback(function(result) {
	                console.log("Response -> " + result);
	            }, 
	            "Re:"+self.event.title, // Subject
	            "",                      // Body
	            [self.author.email],    // To
	            null,                    // CC
	            null,                    // BCC
	            false,                   // isHTML
	            null,                    // Attachments
	            null);                   // Attachment Data
	        } else {
	        	console.log('Cannot send mail from browser !!');
	        }
		};

	});