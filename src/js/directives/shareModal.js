app.directive('shareModal', ['$modal', function($modal) {
    return {
        restrict: 'E',
        transclude: true,
        template: '<button class="btn btn-default btn-block" ng-click="open()">Share</button>',
        link: function(scope, element, attrs) {
            scope.open = function() {
                var openModal = $modal.open({
                    templateUrl: 'views/shareElement.html',
                    controller: 'shareCtrl',
                    size: 'lg',
                    windowClass: 'app-modal-window',
                    backdrop: true,
                    keyboard: true,
                    resolve: {
                        Data: ['dataElementService', '$route', function(dataElementService, $route) {
                            return dataElementService.getAccessRights($route.current.params.dataElementId);
                        }],
                        elementData: ['dataElementService', '$route', function(dataElementService, $route) {
                            return dataElementService.getElement($route.current.params.dataElementId);
                        }]
                    }

                });

                openModal.result.then(function() {
                   console.log('success');

                }), function() {
                    console.log('no success');
                };
            }
        }

    }

}]);