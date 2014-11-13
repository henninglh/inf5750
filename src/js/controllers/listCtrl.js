app.controller("ListController", ['$scope', '$location', 'dataElementService', function($scope, $location, dataElementService) {

    /** Watch expression to check whether the list should be fullSize or not. **/
    $scope.$watch(
        function() {
            return $location.path();
        },
        function( newValue ) {
            $scope.fullSize = (newValue === '/');

            if($scope.fullSize)
                for(var i = 0; i < $scope.dataElements.length; i++)
                    $scope.dataElements[i].active = false;
        }
    );

    $scope.dataElements = [];
    dataElementService.getAllElements().then(function(data) {
        $scope.dataElements = data.dataElements;
    });

    $scope.selectElement = function(element) {
        for(var i = 0; i < $scope.dataElements.length; i++) {
            if ($scope.dataElements[i] === element)
                $scope.dataElements[i].active = true;
            else
                $scope.dataElements[i].active = false;
        }

        $location.path("/show/" + element.id);
    };

    $scope.deleteElement = function(index) {
        if (index >= 0 && index < $scope.dataElements.length) {
            $scope.dataElements.splice(index, 1);
        }
    };
}]);