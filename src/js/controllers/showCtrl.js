
app.controller('showCtrl', ['$scope', 'Data', function($scope, Data) {
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