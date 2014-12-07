app.controller("ListController", ['$window', '$scope', '$location', '$log', 'dataElementService', 'Data', function($window, $scope, $location, $log, dataElementService, Data) {

    /** I've heard rumors that say you don't have to initialize this, but it's good practice. **/
    $scope.listFilter = "";
    $scope.domainFilter = "";

    $scope.dataElements = Data.dataElements;

    $scope.showElement = function(element) {
        $location.path("/show/" + element.id);
    };

    // TODO: Place confirmation on cursor location ($location)
    $scope.deleteElement = function(index, elementId) {
        if (index >= 0 && index < $scope.dataElements.length) {
            if ($window.confirm('Are you sure?')) {
                dataElementService.deleteElement(elementId)
                    .then(function(result) {
                        if (result) {
                            $scope.dataElements.splice(index, 1);
                        } else {
                            console.log("$scope.deleteElement: " + result);
                        }
                    })
            };
        }
    };

}]);
