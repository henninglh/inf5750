app.controller('editCtrl', ['$scope', 'Data', 'CategoryCombos', 'OptionSets', 'MapLegendSets', 'DataElementGroupSetsA', 'DataElementGroupSetsB', function($scope, Data, CategoryCombos, OptionSets, MapLegendSets, DataElementGroupSetsA, DataElementGroupSetsB) {

    var categoryCombos = function() {
        var res = [];
        CategoryCombos.data.categoryCombos.forEach(function(element) {
            res.push({label: element.name, value: element.id});
        });

        return res;
    };

    var optionSets = function() {
        var res = [];
        OptionSets.data.optionSets.forEach(function(element) {
            res.push({label: element.name, value: element.id});
        });

        return res;
    };

    var mapLegendSets = function() {
        var res = [];
        MapLegendSets.data.mapLegendSets.forEach(function(element) {
            res.push({label: element.name, value: element.id});
        });

        return res;
    };

    var dataElementGroupSetsA = function() {
        var res = [];
        DataElementGroupSetsA.data.dataElementGroups.forEach(function(element) {
            res.push({label: element.name, value: element.id});
        });

        return res;
    };

    var dataElementGroupSetsB = function() {
        var res = [];
        DataElementGroupSetsB.data.dataElementGroups.forEach(function(element) {
            res.push({label: element.name, value: element.id});
        });

        return res;
    };

    $scope.schemes = [
        {
            name: "name",
            label: "Name",
            type: "text",
            value: null,
            validation: {
                required: true,
                maxLength: 150
            }
        },
        {
            name: "shortName",
            label: "Short name",
            type: "text",
            value: null,
            validation: {
                required: false,
                maxLength: 50
            }
        },
        {
            name: "code",
            label: "Code",
            type: "text",
            value: null,
            validation: {
                required: false,
                maxLength: 50
            }
        },
        {
            name: "description",
            label: "Description",
            type: "textArea",
            value: null,
            validation: {
                required: false
            }
        },
        {
            name: "formName",
            label: "Form name",
            type: "text",
            value: null,
            validation: {
                required: false,
                maxLength: 150
            }
        },
        {
            name: "domainType",
            label: "Domain type",
            type: "select",
            values: [
                {value: "AGGREGATE", label: "Aggregate"},
                {value: "TRACKER", label: "Tracker"}],
            value: "",
            validation: {
                required: true
            }
        },
        {
            name: "type",
            label: "Value Type",
            type: "select",
            values: [
                {value: "int", label: "Number"},
                {value: "string", label: "Text"},
                {value: "bool", label: "Yes/No"},
                {value: "trueOnly", label: "Yes Only"},
                {value: "date", label: "Date"},
                {value: "username", label: "User name"}
            ],
            value: "",
            dependencies: [
                {
                    parentValue: "string",
                    name: "textType",
                    label: "Text type",
                    type: "select",
                    values: [
                        {value: "text", label: "Text"},
                        {value: "longText", label: "Long text"}
                    ],
                    value: ""
                },
                {
                    parentValue: "int",
                    name: "numberType",
                    label: "Number Type",
                    type: "select",
                    values: [
                        {value: "number", label: "Number"},
                        {value: "int", label: "Integer"},
                        {value: "posInt", label: "Positive Integer"},
                        {value: "negInt", label: "Negative Integer"},
                        {value: "zeroPositiveInt", label: "Positive or Zero Integer"},
                        {value: "unitInterval", label: "Unit Interval"},
                        {value: "percentage", label: "Percentage"}
                    ],
                    value: ""
                }
            ],
            validation: {
                required: true
            }
        },
        {
            name: "aggregationOperator",
            label: "Aggregation operator",
            type: "select",
            values: [
                {value: "sum", label: "Sum"},
                {value: "average", label: "Average (sum in org unit hierarchy)"},
                {value: "avg", label: "Average"},
                {value: "count", label: "Count"},
                {value: "stddev", label: "Standard deviation"},
                {value: "variance", label: "Variance"},
                {value: "min", label: "Min"},
                {value: "max", label: "Max"}
            ],
            value: "",
            validation: {
                required: true
            }
        },
        {
            name: "zeroIsSignificant",
            label: "Store zero data values",
            type: "select",
            values: [
                {value: "false", label: "No"},
                {value: "true", label: "Yes"}
            ],
            value: "",
            validation: {
                required: false
            }
        },
        {
            name: "url",
            label: "URL",
            type: "text",
            value: null,
            validation: {
                required: false,
                maxLength: 255
            }
        },
        {
            name: "categoryCombo",
            label: "Category Combination",
            type: "select",
            values: categoryCombos(),
            value: "",
            validation: {
                required: true
            }
        },
        {
            name: "optionSet",
            label: "Option set for data values",
            type: "select",
            values: optionSets(),
            value: "",
            validation: {
                required: false
            }
        },
        {
            name: "commentOptionSet",
            label: "Option set for comments",
            type: "select",
            values: optionSets(),
            value: "",
            validation: {
                required: false
            }
        },
        {
            name: "selectedLegendSetId",
            label: "Legend set",
            type: "select",
            values: mapLegendSets(),
            value: "",
            validation: {
                required: false
            }
        },
        { // TODO; SELECT MULTIPLE ITEMS
            name: "aggregationLevels",
            label: "Aggregation levels",
            type: "checkbox",
            value: null,
            validation: {
                required: false
            }
        },
        {
            name: "attribute_1149469",
            label: "Rationale",
            type: "text",
            value: null,
            validation: {
                required: false
            }
        },
        {
            name: "attribute_1149470",
            label: "Unit of measure",
            type: "text",
            value: null,
            validation: {
                required: false
            }
        },
        {
            name: "dataElementGroups",
            label: "Main data element groups",
            type: "select",
            values: dataElementGroupSetsA(),
            value: "",
            validation: {
                required: false
            }
        },
        {
            name: "trackerBasedData",
            label: "Tracker based data",
            type: "select",
            values: dataElementGroupSetsB(),
            value: "",
            validation: {
                required: false
            }
        }
    ];
    $scope.labels = {
        title: ((Data == null) ? "Creating new data element" : "Editing data element: " + Data.name)
    };

    if(Data != null) {
        populateSchemesWithData(Data);
    }

    /** Methods to interact with "schemes" **/

    // Checks if required fields are present;
    // Easy to add more validation later!
    // Returns true \ false based on if an error occured or not
    function validateSchemes() {
        var err = 0;
        for(var i = 0; i < $scope.schemes.length; i++) {
            var scheme = $scope.schemes[i];
            if(scheme.validation.required && (!scheme.value || scheme.value.length == 0)) {
                scheme.error = "This field is required";
                err++;
            }

            if(scheme.value !== null && scheme.validation.maxLength !== undefined && scheme.value.length > scheme.validation.maxLength) {
                scheme.error = "This value is too long, max " + scheme.validation.maxLength + " characters";
                err++;
            }
        }

        return err == 0;
    }

    function getDataElementFromSchemes() {
        var dataElement = {};
        for(var i = 0; i < $scope.schemes.length; i++) {
            var scheme = $scope.schemes[i];
            if (!scheme.value || scheme.value.length == 0) {
                continue;
            } else {
                dataElement[scheme.name] = scheme.value;
                if(!scheme.dependencies)
                    continue;

                for(var j = 0; j < scheme.dependencies.length; j++) {
                    dataElement[scheme.dependencies[j].name] = scheme.dependencies[j].value;
                }
            }
        }
        return dataElement;
    }

    function populateSchemesWithData(data) {
        var attr;

        for(attr in data) {
            for(var i = 0; i < $scope.schemes.length; i++) {
                var scheme = $scope.schemes[i];

                if(scheme.name == attr) {

                    if(typeof data[attr] === "boolean")
                        if(data[attr] === true)
                            scheme.value = "true";
                        else
                            scheme.value = "false";

                    if(typeof data[attr] === "string")
                        scheme.value = data[attr];

                    if(typeof data[attr] === "object") {

                        if(attr == "categoryCombo") {
                            scheme.value = data[attr].id;

                            break;
                        }

                        if(attr == "aggregationLevels") {
                            scheme.value = data[attr].id;

                            break;
                        }

                        if(attr == "dataElementGroups") {
                            scheme.value = [];
                            for(var i = 0; i < data[attr].length; i++) {
                                scheme.value.push({value: data[attr][i].id, label: data[attr][i].name});
                            }

                            break;
                        }

                        console.log(attr, "Still needs a home");
                    }

                    break;
                } else {
                    if(!scheme.dependencies) {
                        continue;
                    }

                    for (var j = 0; j < scheme.dependencies.length; j++) {
                        var dependency = scheme.dependencies[j];

                        if (dependency.name == attr) {
                            dependency.value = data[attr] + "";
                            break;
                        }
                    }
                }

            }
        }

    }

    $scope.save = function() {
        console.log("validation is: ", validateSchemes());
        var result = getDataElementFromSchemes();
    };

    $scope.showOptional = false;
}]);