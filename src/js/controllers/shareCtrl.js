app.controller('shareCtrl', ['$scope', '$modal', 'Data', 'elementData', function($scope, $modal, Data, elementData) {
    $scope.data = elementData;
    $scope.metaData = Data;

    /**
     * Object to handle each request to the API. Should be used as a payload
     * on the API post-request.
     */
    $scope.accessObject = {
        "meta": {
            "allowPublicAccess": true,
            "allowExternalAccess": false
        },
        "object": {
            "id": "fbfJHSPpUQD",
            "name": "ANC 1st visit",
            "publicAccess": "rw------",
            "externalAccess": false,
            "user": {},
            "userGroupAccesses": [
                {
                    "id": "hj0nnsVsPLU",
                    "access": "rw------"
                },
                {
                    "id": "qMjBflJMOfB",
                    "access": "r-------"
                }
            ]
        }
    }

    $scope.test = [
        {
            id: 1,
            name: "Gruppe 1",
            access: "rw------"
        },
        {
            id: 2,
            name: "Gruppe 2",
            access: "r-------"
        },
        {
            id: 3,
            name: "Gruppe 3",
            access: "--------"
        }
    ];

    function populate(data){
        //TODO: Populate the data, if there are no

    }
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

    /**
     * Saving the changes to the API. POST-request
     */
    function saveModal(){
        if ($scope.accessObject.changed == false){
            return;
        } else {
            //Sends the request to the API.
            dataElementService.updateAccess($scope.accessObject)
        }


    }

    /**
     * Cancels the edits in the modal, goes back to the element
     */
    function closeModal(){


    }



}]);