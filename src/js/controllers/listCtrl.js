app.controller("ListController", ['$scope', '$location', function($scope, $location) {

    /** Watch expression to check whether the list should be fullSize or not. **/
    $scope.$watch(
        function() {
            return $location.path();
        },
        function( newValue ) {
            $scope.fullSize = (newValue === '/');
        }
    );

    this.currentElement = -1;
    this.editItem = -1;
    this.dataElements = [
        {
            name: "Element one",
            id: 0
        },
        {
            name: "Element two",
            id: 1
        },
        {
            name: "Element three",
            id: 2
        },
        {
            name: "Element four",
            id: 3
        },
        {
            name: "Element five",
            id: 4
        },
        {
            name: "Element six",
            id: 5
        },
        {
            name: "Element seven",
            id: 6
        },
        {
            name: "Element eight",
            id: 7
        },
        {
            name: "Element nine",
            id: 8
        },
        {
            name: "Element ten",
            id: 9
        }
    ];
}]);