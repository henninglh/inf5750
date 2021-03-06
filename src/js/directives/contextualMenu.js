app.directive('contextualMenu', ['$route', '$window', '$location', 'dataElementService', function($route, $window, $location, dataElementService) {
    return {
        restrict: 'C',
        templateUrl: 'views/contextualMenu.html',
        controller: ['$scope', '$location', function($scope, $location) {
            $scope.currentElement = "";

            $scope.buttonRequired = function(btn) {
                for(var i = 0; i < $scope.buttons.length; i++)
                    if($scope.buttons[i] == btn)
                        return true;
                return false;
            };

            $scope.shareElement = function() {
                dataElementService.getAccessRights($route.current.params.dataElementId);
            }

            $scope.deleteElement = function() {
                if ($window.confirm("Are you sure you want to delete this element?")) {
                    dataElementService.deleteElement($route.current.params.dataElementId);
                    $location.path('#/');
                }
            };
            $scope.$watch(
                function() {
                    return $location.path();
                },
                function(n) {
                    $scope.buttons = ['create'];
                    $scope.currentElement = "";

                    // Find route
                    if(n.indexOf("show") > -1) {
                        $scope.buttons = ['clone', 'edit', 'delete', 'access', 'back'];
                        $scope.currentElement = $location.path().replace(new RegExp("/show/"), "");
                    }
                    if(n.indexOf("create") > -1) {
                        $scope.buttons = ['back'];
                    }
                    if(n.indexOf("clone") > -1) {
                        $scope.buttons = ['back', 'delete', 'access'];
                        $scope.currentElement = $location.path().replace(new RegExp("/clone/"), "");
                    }
                    if(n.indexOf("edit") > -1) {
                        $scope.buttons = ['back', 'delete', 'access'];
                        $scope.currentElement = $location.path().replace(new RegExp("/edit/"), "");
                    }
                }
            )
        }]
    };
}]);