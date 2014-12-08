
app.controller('showCtrl', ['$scope', 'Data', '$filter', function($scope, Data, $filter) {

    $scope.data = Data;

    $scope.labels = {
        name : Data.name,
        shortName : Data.shortName,
        description : Data.description,
        domainType : Data.domainType,
        valueType : Data.numberType,
        aggregationOperator : Data.aggregationOperator,
        categoryCombination : Data.categoryCombo.name,
        url : Data.url,
        lastUpdated : $filter('date')(Data.lastUpdated, 'd-MMM-yyyy H:mm'),
        dataSets : Data.dataSets,
        id : Data.id,
        code : Data.code,
        created: $filter('date')(Data.created, 'd-MMM-yyyy H:mm')
    };

    $scope.getAccess = function(access) {
        return "Can read" + (access.charAt(1) == 'w' ? " and write" : "");
    };

    $scope.getAggregationLevel = function(level) {
        switch(level) {
            case 1: return "National";
            case 2: return "District";
            case 3: return "Chiefdom";
            case 4: return "Facility";
        }
    };

    $scope.getTypeName = function(type) {
        switch(type) {
            case "int": return "Number";
            case "bool": return "Yes/No";
            case "string": return "Text";
            case "trueOnly": return "Yes only";
            case "date": return "Date";
            case "username": return "User name";
            case "text": return "Text";
            case "longText": return "Long text";
            case "number": return "Number";
            case "int": return "Integer";
            case "posInt": return "Positive Integer";
            case "negInt": return "Negative Integer";
            case "zeroPositiveInt": return "Positive or Zero Integer";
            case "unitInterval": return "Unit Interval";
            case "percentage": return "Percentage";
        }
    }

}]);