
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
            $http.get('/api/dataElements.json?fields=*&paging=false')
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

        // MAKE SURE ELEMENTS EXISTS

        // SEND HTTP REQ
        var deferred = $q.defer();

        for(var i = 0; i < elements.dataElements.length; i++)
            if(elements.dataElements[i].id === elementId) {
                elements.dataElements.splice(i, 1);
                deferred.resolve(true)
            }

        deferred.reject(false);

        return deferred.promise;
    }
    function getAccessRights(elementID) {
        var deferred = $q.defer();

        $http.get('/api/sharing?type=dataElement&id=' + elementID)
            .success(function(res) {
                deferred.resolve(res)
            })
            .error(function(err) {
                deferred.reject(err);
            })

        return deferred.promise;
    }

    function updateAccessRights(elementID, accessObject) {
        var deferred = $q.defer();

        var request = $http({
            method: 'POST',
            url: '/api/sharing?type=dataElement&id=' + elementID,
            data: $.param(accessObject)
        });

        request.success(
            function(res) {
                deferred.resolve(res);
            }
        );

        request.error(
            function(err) {
                deferred.reject(err);
            }
        );

        return deferred.promise;
    }

    function updateElement(element) {
        var deferred = $q.defer();

        $http.put('/api/dataElements/' + element.id + '.json', element)
            .success(function(res) {
                if(!elements) {
                    getAllElements().then(function() {
                        deferred.resolve(res);
                    });
                } else {
                    for(var i = 0; i < elements.dataElements.length; i++) {
                        if(elements.dataElements[i].id == res.lastImported) {
                            elements.dataElements[i] = element;
                            deferred.resolve(res);
                            return deferred.promise;
                        }
                    }
                }
            })
            .error(function(err) {
                deferred.reject(err);
            });

        return deferred.promise;
    }

    function createElement(element) {
        var deferred = $q.defer();

        $http.post('/api/dataElements.json', element)
            .success(function(res) {
                if(!elements) {
                    getAllElements().then(function() {
                        deferred.resolve(res);
                    });
                } else {
                    if(!res.importConflicts) {
                        element.id = res.lastImported;
                        elements.dataElements.push(element);
                    }
                    deferred.resolve(res);
                }

            })
            .error(function(err) {
                deferred.reject(err);
            });

        return deferred.promise;
    }

    function isUnique(key, value) {
        var deferred = $q.defer();

        if(!elements) {
            getAllElements().then(function() {
                for(var i = 0; i < elements.dataElements.length; i++) {
                    if(elements.dataElements[i][key] == value) {
                        deferred.resolve({key: key, value: value, unique: false});
                        break;
                    }
                }

                deferred.resolve(true);
            });
        } else {
            for(var i = 0; i < elements.dataElements.length; i++) {
                if(elements.dataElements[i][key] == value) {
                    deferred.resolve({key: key, value: value, unique: false});
                    return deferred.promise;
                }
            }

            deferred.resolve({key: key, value: value, unique: true});
        }

        return deferred.promise;
    }

    return {
        getElement: getElement,
        getAllElements: getAllElements,
        deleteElement: deleteElement,
        updateElement: updateElement,
        createElement: createElement,
        getAccessRights : getAccessRights,
        updateAccessRights: updateAccessRights,
        isUnique: isUnique
    }

}]);