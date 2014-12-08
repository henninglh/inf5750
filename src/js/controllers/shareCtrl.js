app.controller('shareCtrl', ['$scope', '$modal', 'Data', function($scope, $modal, Data) {
    $scope.showModal = false;

    $scope.toggleModal = function(){
        $scope.showModal = !$scope.showModal;
    }

    console.log(Data);

    $scope.metaData = {
        allowExternalAccess: Data.allowExternalAccess,
        allowPublicAccess: Data.allowPublicAccess
    }

    function openModal(){
        var open = $modal.open(

        );

    }

    function saveModal(){

    }

    function closeModal(){

    }



}]);