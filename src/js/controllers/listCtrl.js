app.controller("ListController", ['$window', '$scope', '$location', 'dataElementService', 'Data', function($window, $scope, $location, dataElementService, Data) {

    /** I've heard rumors that say you don't have to initialize this, but it's good practice. **/
    $scope.listFilter = "";

    $scope.dataElements = Data;

    $scope.selectElement = function(element) {
        for(var i = 0; i < $scope.dataElements.length; i++) {
            if ($scope.dataElements[i] === element)
                $scope.dataElements[i].active = true;
            else
                $scope.dataElements[i].active = false;
        }

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
