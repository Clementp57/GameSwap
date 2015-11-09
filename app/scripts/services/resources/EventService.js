'use strict';

/**
 * @ngdoc function
 * @name GameSwap.serive:EventService
 * @description
 * # EventService
 */
angular.module('GameSwap')
	// use factory for services
	.factory('EventService', function($resource, ApiService) {
		var eventsEndpoint = ApiService.getEndpoint() + '/events/:id';

		var Event = $resource(eventsEndpoint, {}, {
			get: {
				method : 'GET',
				params: {
					id: 'id'
				}
			},
			addComment: {
				method: 'POST',
				url: ApiService.getEndpoint() + '/events/comments'
			},
			getAllComments: {
				method: 'GET',
				params: {
					id: 'id'
				},
				url: ApiService.getEndpoint() + '/events/:id/comments',
				isArray: true
			},
			deleteComment: {
				method: 'DELETE',
				params: {
					id: 'id'
				},
				url: ApiService.getEndpoint() + '/events/comments/:id'
			},
			getUserEvents: {
		        method: 'GET',
		        params: {
		          id: 'id'
		        },
		        url: ApiService.getEndpoint() + '/events/forUser/:id',
		        isArray: true
		      }
		});

		Event.prototype.addComment = function(comment) {
			return $http.post(ApiService.getEndpoint() + '/events/:id/comments', comment);
		};


		return Event;
	});