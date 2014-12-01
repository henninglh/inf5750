app.directive('formElement', [function() {

    return {
        scope: {
            scheme: "=scheme",
            show: "=show"
        },
        restrict: 'E',
        templateUrl: 'views/formElement.html'
    };

}]);