app.controller("ListController", ['$window', '$scope', '$location', '$log', 'dataElementService', 'Data', function($window, $scope, $location, $log, dataElementService, Data) {

    /** I've heard rumors that say you don't have to initialize this, but it's good practice. **/
    $scope.listFilter = "";
    $scope.domainFilter = "";

    $scope.dataElements = Data.dataElements;

    $scope.showElement = function(element) {
        $location.path("/show/" + element.id);
    };

    $scope.deleteElement = function(elementId) {
        if ($window.confirm('Are you sure?')) {
            dataElementService.deleteElement(elementId)
                .then(function() {
                    $scope.dataElements = dataElementService.getAllElements();
                });
        }
        $location.path('/');
    };
}]);
