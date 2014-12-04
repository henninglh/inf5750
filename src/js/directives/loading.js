/**
 * Created by Stian on 04.12.2014.
 */

app.directive('loader', ['$rootScope', function($rootScope) {

    return {
        controller: ['$scope', function($scope) {
          $scope.isLoading = function() { return $rootScope.loading.length > 0; }
        }],
        restrict: 'E',
        template: "<h1>Current loading: {{isLoading()}}</h1><div ng-show='isLoading()'>Loading!</div><div ng-hide='isLoading()' ng-transclude></div>",
        transclude: true
    }

}]);