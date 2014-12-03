
app.controller('showCtrl', ['$scope', 'Data', 'dataElementService', function($scope, Data, dataElementService) {
    $scope.labels = {
        name : Data.name,
        shortName : Data.shortName,
        description : Data.description,
        domainType : Data.domainType,
        valueType : Data.numberType,
        aggregationOperator : Data.aggregationOperator,
        categoryCombination : Data.categoryCombo.name,
        url : Data.url,
        lastUpdated : Data.lastUpdated,
        dataSets : Data.dataSets,
        id : Data.id
    };
}]);