
/*
 * This service has test-data in it; The actual HTTP requests will be implemented between milestone 2 and 3.
 * $q is currently also ONLY used for test-data; Not production code
 */

app.service('dataElementService', ['$http', '$q', "$log", function($http, $q) {
    var elements = null;


    function getAllElements() {
        var deferred = $q.defer();
        if (elements !== null) {
            deferred.resolve(elements);
        } else {
            $http.get('http://inf5750-2.uio.no/api/dataElements.json?fields=*&paging=false')
                .success(function (data) {
                    elements = data;
                    deferred.resolve(elements);
                }).error(function (msg, code) {
                    $log.error(msg, code);
                    deferred.reject(msg);
                });
        }

        return deferred.promise;
    }

    function getElement(elementId) {
        var deferred = $q.defer();

        getAllElements()
            .then(function(elements) {
                for(var i = 0; i < elements.dataElements.length; i++) {
                    if (elements.dataElements[i].id === elementId) {
                        deferred.resolve(elements.dataElements[i]);
                        break;
                    }
                }
            }, function(err) {
                deferred.reject(err);
            });

        return deferred.promise;
    }

    function deleteElement(elementId) {
        var deferred = $q.defer();

        for(var i = 0; i < elements.dataElements.length; i++)
            if(elements.dataElements[i].id === elementId) {
                elements.dataElements.splice(i, 1);
                deferred.resolve(true)
            }

        deferred.reject(false);

        return deferred.promise;
    }

    function updateElement(element) {
        var deferred = $q.defer();

        for(var i = 0; i < elements.dataElements.length; i++)
            if(elements.dataElements[i].id === elementId) {
                element.dataElements[i] = element;
                deferred.resolve(elements.dataElements[i]);
            }

        deferred.reject({status: 404});

        return deferred.promise;
    }

    function createElement(element) {
        var deferred = $q.defer();

        element.id = (Math.random() * 100000000);
        element.dataElements.push(element);

        deferred.resolve(element);

        return deferred.promise;
    }

    return {
        getElement: getElement,
        getAllElements: getAllElements,
        deleteElement: deleteElement,
        updateElement: updateElement,
        createElement: createElement
    }

}]);