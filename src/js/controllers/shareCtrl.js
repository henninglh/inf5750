app.controller('shareCtrl', ['$scope', '$modal', 'Data', 'elementData', function($scope, $modal, Data, elementData) {
    $scope.data = elementData;
    $scope.metaData = Data;

    $scope.dataObject = {
        userGroups: "",
        externalAccess: "",
        publicAccess: ""
    };

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

    /**
     * Get values from object
     */
    function getValues(){
        var dataElement = {};
        for (var i = 0; i < $scope.dataObject.length; i++) {
            var scheme = $scope.dataObject[i];
            if (!scheme.value || scheme.value.length == 0) {
                continue;
            } else {
                dataElement[scheme.name] = scheme.value;
                if (!scheme.dependencies)
                    continue;

                for (var j = 0; j < scheme.dependencies.length; j++) {
                    dataElement[scheme.dependencies[j].name] = scheme.dependencies[j] = value;
                }
            }
        }
        if (elementData != null && Data.id != null)
            dataElement.id = Data.id;
        return dataElement;
    }
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