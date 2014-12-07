/**
 * Created by Kjetil on 05.11.14.
 */
app.config(['$httpProvider', function($httpProvider) {

    $httpProvider.interceptors.push(['$q', '$rootScope', function($q, $rootScope) {
        return {
            'request': function(config) {
                if(!$rootScope.loading)
                    $rootScope.loading = [];

                $rootScope.loading.push(config);
                return config;
            },
            'requestError': function(config) {
                console.log("RequestError discovered!", config);
                return config;
            },
            'response': function(response) {
                if(!$rootScope.loading)
                    $rootScope.loading = [];

                for(var i = 0; i < $rootScope.loading.length; i++) {
                    var config = $rootScope.loading[i];

                    if (config.url == response.config.url) {
                        $rootScope.loading.splice(i, 1);
                        break;
                    }
                }
                return response;
            },
            'responseError': function(response) {
                if(!$rootScope.loading)
                    $rootScope.loading = [];

                for(var i = 0; i < $rootScope.loading.length; i++) {
                    var config = $rootScope.loading[i];

                    if (config.url == response.config.url) {
                        $rootScope.loading.splice(i, 1);
                        break;
                    }
                }
                return response;
            }
        }
    }]);
}]);

app.config(['uiSelectConfig', function(uiSelectConfig) {
    uiSelectConfig.theme = 'bootstrap';
}]);
