app.controller("ListController", ['$window', '$scope', '$location', '$log', '$filter', 'dataElementService', 'Data', function($window, $scope, $location, $log, $filter, dataElementService, Data) {

    /** I've heard rumors that say you don't have to initialize this, but it's good practice. **/
    $scope.listFilter = '';
    $scope.domainFilter = '';

    // Filtering
    $scope.dataElements = Data.dataElements;
    $scope.filteredDataElements = $scope.dataElements;

    $scope.$watchGroup(['listFilter', 'domainFilter'], function() {
        $scope.filteredDataElements = $filter('filter')($scope.dataElements, {domainType: $scope.domainFilter});
        $scope.filteredDataElements = $filter('filter')($scope.filteredDataElements, $scope.listFilter);
        $log.info("listFilter: " + $scope.listFilter);
        $log.info("domainFilter: " + $scope.domainFilter);
    });

    // Pagination
    $scope.pageCurrent = 0;
    $scope.pageSize = 20;

    $scope.$watch(function(){return $scope.filteredDataElements}, function() {
        $scope.pageMax = Math.floor($scope.filteredDataElements.length / $scope.pageSize);
        $log.info("pageMax: " + $scope.pageMax);

        if ($scope.pageMax < $scope.pageCurrent) {
            $scope.pageCurrent = $scope.pageMax;
            $log.info("pagecurrent set to pageMax");
            updateCurrentPage();
        }
    });

    $scope.$watchGroup(['pageCurrent', 'filteredDataElements'], function() {
        updateCurrentPage();
    });

    // Helper for watchers above.
    var updateCurrentPage = function() {
        var start = $scope.pageCurrent * $scope.pageSize,
            end = start + $scope.pageSize;
        $scope.pageDataElements = $scope.filteredDataElements.slice(start, end);
        $log.info("start: " + start);
        $log.info("end: " + end);
    }

    $scope.nextPage = function() {
        if ($scope.pageCurrent < $scope.pageMax) {
            $scope.pageCurrent++;
            $log.info("go to page: " + $scope.pageCurrent);
        }
    };

    $scope.prevPage = function() {
        if ($scope.pageCurrent > 0) {
            $scope.pageCurrent--;
            $log.info("go to page: " + $scope.pageCurrent);
        }
    };

    // Utility
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

app.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return
    }
});
