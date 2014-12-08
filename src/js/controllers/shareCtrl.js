app.controller('shareCtrl', ['$scope', '$modal', 'Data', 'elementData', function($scope, $modal, Data, elementData) {
    $scope.showModal = false;

    $scope.data = elementData;
    $scope.metaData = Data;

    $scope.toggleModal = function(){
        $scope.showModal = !$scope.showModal;
    };

    console.log(elementData);
    console.log(Data);
    //Resolved from the /api/sharing call
    //$scope.metaData = {
    //    allowExternalAccess: Data.meta.allowExternalAccess,
    //    allowPublicAccess: Data.meta.allowPublicAccess
    //}

    //Resolved from the /api/dataelement call...
    //$scope.dataElementGroup = {
    //    name: elementData.name,
    //    created: elementData.created,
    //    groups: elementData.dataElementGroups,
    //    user: elementData.user
    //}

    //Saving
    function saveModal(){

    }

    //Cancel
    function closeModal(){

    }



}]);