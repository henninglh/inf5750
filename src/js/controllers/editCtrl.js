app.controller('editCtrl', ['$scope', 'Data', function($scope, Data) {

    $scope.labels = {
        title: ((Data == null) ? "Creating new data element" : "Editing data element: " + Data.name)
    }

    var defaultObj = {
        name: null,
        domainType: null,
        valueType: null,
        aggregatorType: null
    };

    var dataTypes = {
        name: {
            type: 'text',
            required: true
        },
        shortName: {
            type: 'text'
        },
        code: {
            type: 'text'
        },
        description: {
            type: 'textArea'
        },
        formName: {
            type: 'text'
        },
        domainType: {
            type: 'select',
            values: ['Aggregate', 'Tracker'],
            required: true
        },
        valueType: {
            type: 'select',
            values: ['Number', 'Text', 'Yes/No', 'Yes Only', 'Date', 'User name'],
            required: true
        },
        textType: {
            type: 'select',
            values: ['Text', 'Long text'],
            required: 'valueType:Text'
        },
        numberType: {
            type: 'select',
            values: ['Number', 'Integer', 'Positive Integer', 'Negative Integer', 'Prosivite or Zero Integer', 'Unit Interval', 'Percentage'],
            required: 'valueType:Number'
        },
        aggregationOperator: {
            type: 'select',
            values: ['Sum', 'Average', 'Count', 'Standard deviation', 'Variance', 'Min', 'Max'],
            required: true
        },
        storeZeroDataValues: {
            type: 'select',
            values: ['Yes', 'No']
        },
        url: {
            type: 'text'
        },
        categoryCombination: {
            type: 'select',
            values: 'api:categoryCombos',
            required: true
        },
        optionSetForDataValues: {
            type: 'select',
            values: 'api:optionSets'
        },
        optionSetForComments: {
            type: 'select',
            values: 'api:optionSets'
        },
        legendSet: {
            type: 'select',
            values: 'api:mapLegendSets'
        },
        aggregationLevels: {
            type: 'checkbox'
        },
        rationale: {
            type: 'text'
        },
        unitOfMeasure: {
            type: 'text'
        },
        mainDataElementGroups: {
            type: 'select',
            values: 'api:dataElementGroupSets/XY1vwCQskjX'
        },
        trackerBasedData: {
            type: 'select',
            values: 'api:dataElementGroupSets/VxWloRvAze8'
        }
    };

    $scope.data = Data || defaultObj;

    console.log(Data);
}]);