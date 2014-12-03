app.controller('editCtrl', ['$scope', '$window', 'Data', 'CategoryCombos', 'OptionSets', 'MapLegendSets', 'DataElementGroupSetsA', 'DataElementGroupSetsB', 'dataElementService', function($scope, $window, Data, CategoryCombos, OptionSets, MapLegendSets, DataElementGroupSetsA, DataElementGroupSetsB, dataElementService) {

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
            values: CategoryCombos,
            value: "",
            validation: {
                required: true
            }
        },
        {
            name: "optionSet",
            label: "Option set for data values",
            type: "select",
            values: OptionSets,
            value: "",
            validation: {
                required: false
            }
        },
        {
            name: "commentOptionSet",
            label: "Option set for comments",
            type: "select",
            values: OptionSets,
            value: "",
            validation: {
                required: false
            }
        },
        {
            name: "selectedLegendSetId",
            label: "Legend set",
            type: "select",
            values: MapLegendSets,
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
            values: DataElementGroupSetsA,
            value: "",
            validation: {
                required: false
            }
        },
        {
            name: "trackerBasedData",
            label: "Tracker based data",
            type: "select",
            values: DataElementGroupSetsB,
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

        var attr;

        // TODO: Get the data not modified by the schemas
        for (attr in Data) {
            if (dataElement[attr] === null) {
                dataElement[attr] = Data[attr];
            }
        }
        return dataElement;
    }

    function populateSchemesWithData(data) {
        console.log($scope.schemes);
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
                            for(var j = 0; j < data[attr].length; j++) {
                                scheme.value.push({value: data[attr][j].id, label: data[attr][j].name});
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

                    for (var k = 0; k < scheme.dependencies.length; k++) {
                        var dependency = scheme.dependencies[k];

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
        var allSchemesAreValid = validateSchemes();
        console.log("All schemes validated: " + allSchemesAreValid);

        if (allSchemesAreValid) {
            var result = getDataElementFromSchemes();
            var promise;

            // TODO: Make this "if" more failsafe
            if ($location.path().indexOf("clone") != -1) {
                promise = dataElementService.createElement(result);
            } else {
                promise = dataElementService.updateElement(result);
            }
            promise.then(function(res) {
                if (res) {
                    // TODO: remove from elements in list
                    $window.alert("Saved!");
                } else {
                    $window.alert("Failed to update/create the element on the server!");
                }
            });
        } else {
            $window.alert("All schemes are not valid!");
        }

        $location.path("#/");
    };

    $scope.cancel = function() {
        if ($window.confirm("Are you sure you want to cancel?")) {
            // TODO: clear all schemas?
            $location.path("#/");
        }
    };

    $scope.showOptional = false;
}]);