app.controller("ListController", ['$window', '$scope', '$location', '$log', '$watch', '$filter', 'dataElementService', 'Data', function($window, $scope, $location, $log, dataElementService, Data) {
    $scope.dataElements = Data.dataElements;

    /** I've heard rumors that say you don't have to initialize this, but it's good practice. **/
    $scope.listFilter = "";
    $scope.domainFilter = "";

    /** Pagination **/
    $scope.itemsPerPage = 10
    $scope.currentPage = 1;

    $scope.pageCount = function () {
        return Math.ceil($scope.dataElements.length / $scope.itemsPerPage);
    };

    $scope.totalItems = $scope.dataElements.length;
    $scope.$watch('currentPage + itemsPerPage', function() {
        var begin = (($scope.currentPage - 1) * $scope.itemsPerPage),
            end = begin + $scope.itemsPerPage;

        $scope.filteredDataElements = $filter($filter($scope.dataElements, {domainType: $scope.domainFilter}), $scope.listFilter).slice(begin, end);
    });

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
