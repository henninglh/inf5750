app.service('dataElementService', ['$http', '$q', "$log", function($http, $q) {
    var elements;

    function getElement(elementId) {
        var deferred = $q.defer();
        for(var i = 0; i < elements.dataElements.length; i++)
            if(elements.dataElements[i].id === elementId)
                deferred.resolve(elements.dataElements[i]);
        deferred.reject({status: 404});
        return deferred.promise;
    }

    function getAllElements() {
        var deferred = $q.defer();
        if (elements) {
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

    function deleteElement(elementId) {
        var deferred = $q.defer();

        for(var i = 0; i < elements.dataElements.length; i++)
            if(elements.dataElements[i].id === elementId) {
                /* TODO: FIX THIS SHIT!
                $http.delete('http://inf5750-2.uio.no/api/dataElements/' + elementId)
                    .success(function (data) {
                        console.log("DELETE SUCCESS: " + data);
                        elements.dataElements.splice(i, 1);
                        deferred.resolve(true)
                    }).error(function (msg, code) {
                        console.log("DELETE FAILURE: " + msg + " (" + code + ")");
                    });
                    */
            }

        deferred.reject(false);

        return deferred.promise;
    }

    function updateElement(element) {
        var deferred = $q.defer();

        for(var i = 0; i < elements.dataElements.length; i++)
            if(elements.dataElements[i].id === element.id) {
                elements.dataElements[i] = element;
                deferred.resolve(elements.dataElements[i]);
            }

        deferred.reject({status: 404});

        return deferred.promise;
    }

    function createElement(element) {
        var deferred = $q.defer();

        element.id = (Math.random() * 100000000);
        elements.dataElements.push(element);

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