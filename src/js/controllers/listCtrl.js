app.controller("ListController", ['$window', '$scope', '$location', '$log', '$filter', '$route', '$rootScope', 'dataElementService', 'Data', function($window, $scope, $location, $log, $filter, $route, $rootScope, dataElementService, Data) {

    /** I've heard rumors that say you don't have to initialize this, but it's good practice. **/
    $scope.listFilter = '';
    $scope.domainFilter = '';

    // Pagination
    $rootScope.pageCurrent = 0;
    $rootScope.pageSize = 20;

    if (dataElementService.elements == null) {
        dataElementService.getAllElements().then(function(elements) {
            $scope.dataElements = elements.dataElements;
        });
    } else {
        $scope.dataElements = dataElementService.elements.dataElements;
    }

    $scope.nextPage = function() {
        if ($rootScope.pageCurrent + 1 < $rootScope.pageMax) {
            $rootScope.pageCurrent++;
            $log.info("go to page: " + $rootScope.pageCurrent);
        }
    };

    $scope.prevPage = function() {
        if ($rootScope.pageCurrent > 0) {
            $rootScope.pageCurrent--;
            $log.info("go to page: " + $rootScope.pageCurrent);
        }
    };

    // Utility
    $scope.showElement = function(element) {
        $location.path("/show/" + element.id);
    };

    $scope.deleteElement = function(elementId) {
        if ($window.confirm('Are you sure?')) {
            dataElementService.deleteElement(elementId);
        }
    };
}]);

app.filter('limitToPage', ['$rootScope', function($rootScope) {
    return function (array) {
        var start = $rootScope.pageCurrent * $rootScope.pageSize,
            stop = start + $rootScope.pageSize;

        $rootScope.pageMax = Math.ceil(array.length / $rootScope.pageSize);
        if ($rootScope.pageCurrent > $rootScope.pageMax - 1) {
            $rootScope.pageCurrent = $rootScope.pageMax - 1;
        }

        return array.slice(start, stop);
    }
}]);
