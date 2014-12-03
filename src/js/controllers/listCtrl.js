app.controller("ListController", ['$window', '$scope', '$location', '$log', 'dataElementService', 'Data', function($window, $scope, $location, $log, dataElementService, Data) {

    /** I've heard rumors that say you don't have to initialize this, but it's good practice. **/
    $scope.listFilter = "";

    $scope.dataElements = Data.dataElements;

    $scope.selectElement = function(element) {
        for(var i = 0; i < $scope.dataElements.length; i++) {
            $scope.dataElements[i].active = $scope.dataElements[i] === element;
        }

        $location.path("/show/" + element.id);
    };

    $scope.deleteElement = function(index, elementId) {
        if (index >= 0 && index < $scope.dataElements.length) {
            if ($window.confirm('Are you sure you want to delete this element?')) {
                dataElementService.deleteElement(elementId)
                    .then(function(result) {
                        if (result) {
                            $scope.dataElements.splice(index, 1);
                        } else {
                            console.log("Failed to remove the element - result: " + result);
                        }
                    })
            }
        }
    };
}]);
