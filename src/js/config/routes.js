/**
 * Configure each route in our application, using ngRoute
 **/
app.config(['$routeProvider', function($routeProvider) {

    $routeProvider

        // When at the root url, the view should be empty, as we are showing the list
        .when('/', {
            template: ''
        })

        // When we are at create, we should use the edit.html with the editCtrl, and inject Data = null
        // This is to tell the Controller we are working with a new Data Element
        .when('/create', {
            templateUrl: 'views/edit.html',
            controller: 'editCtrl',
            resolve: {
                Data: function() {
                    return null;
                }
            }
        })

        // When we are at edit/:dataElementId, we are editing an existing data element. We are using edit.html
        // and editCtrl here as well, and resolving a promise made to the api to the the data of the dataElement.
        .when('/edit/:dataElementId', {
            templateUrl: 'views/edit.html',
            controller: 'editCtrl',
            resolve: {
                Data: ['dataElementService', '$route', function(dataElementService, $route) {
                    return dataElementService.getElement($route.current.params.dataElementId);
                }]
            }
        })

        // When we are at clone/:dataElementId, we are cloning an existing dataElement (with id = dataelementId)
        // We are making a request to the api to get the data of the existing element
        .when('/clone/:dataElementId', {
            templateUrl: 'views/edit.html',
            controller: 'editCtrl',
            resolve: {
                Data: ['$http', function($http) {
                    return null;
                    //return $http.get('url-to-some-data-element');
                }]
            }
        })

        // When we are at show/:dataelementId, we are showing information about the selected element.
        // We request data from the api to fill our our view with the dataElements data.
        .when('/show/:dataElementId', {
            controller: 'showCtrl',
            templateUrl: 'views/show.html',
            resolve: {
                Data: ['dataElementService', '$route', function(dataElementService, $route) {
                    return dataElementService.getElement($route.current.params.dataElementId);
                }]
            }
        })

        // When accessing a url not covered in the routing, we send the user to the root(list).
        .otherwise({
            template: ''
        });

}]);