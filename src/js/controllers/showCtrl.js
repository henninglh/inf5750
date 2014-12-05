
app.controller('showCtrl', ['$scope', 'Data', '$filter', function($scope, Data, $filter) {
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
        id : Data.id
    };

}]);