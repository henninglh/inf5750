app.controller('shareCtrl', ['$scope', 'Data', '$modal', function($scope, Data, $modal) {
    console.log(Data);

    $scope.metaData = {
        allowExternalAccess: Data.allowExternalAccess,
        allowPublicAccess: Data.allowPublicAccess
    }


}]);