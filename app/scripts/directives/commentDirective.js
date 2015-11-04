angular.module('GameSwap')
    .directive('comments', function(EventService, ServerService) {
        return {
            restrict: 'EA', //E = element, A = attribute, C = class, M = comment         
            scope: {
                //@ reads the attribute value, = provides two-way binding, & works with functions
                eventId: '='
            },
            templateUrl: '../../templates/directives/comments.html',
            link: function($scope, element, attrs) {
                $scope.comments = [];
                $scope.$watch('eventId', function(eventId) {
                    initialize(eventId);
                });

                var initialize = function(eventId) {
                    EventService.getAllComments({
                        id: eventId
                    }).$promise.then(function(comments) {
                        $scope.comments = comments;
                    });  

                    $scope.addComment = function() {
                        if($scope.commentContent != ""){ 
                            var comment = {
                                authorId: ServerService.getLoggedUser()._id,
                                content: $scope.commentContent,
                                date: new Date(),
                                eventId: eventId,
                                authorPicture: ServerService.getLoggedUser().picture,
                                authorName: ServerService.getLoggedUser().name
                            };

                            EventService.addComment(comment).$promise.then(function(data) {
                                $scope.comments.push(comment);
                                $scope.commentContent = "";
                            });
                        }
                    }
                }
            }
        }
    });