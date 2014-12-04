/**
 * Created by Stian on 04.12.2014.
 */

app.directive('loader', ['$rootScope', function($rootScope) {

    return {
        controller: ['$scope', function($scope) {
          $scope.isLoading = function() { return $rootScope.loading.length > 0; }
        }],
        restrict: 'E',
        template: "<div ng-show='isLoading()'><div class='loading-gif'>Solving world problems</div></div><div ng-hide='isLoading()' ng-transclude></div>",
        transclude: true
    }

}]);