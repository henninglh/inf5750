
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
        var deferred = $q.defer();
        $http.get('/api/dataElements/' + elementId)
            .success(function(getData, getCode) {
                if (getCode >= 200 && getCode < 300) {
                    $http.delete('/api/dataElements/' + elementId)
                        .success(function (deleteData, deleteCode) {
                            if (deleteCode >= 200 && deleteCode < 300) {
                                for (var i = 0; i < elements.dataElements.length; i++) {
                                    if (elements.dataElements[i].id === elementId) {
                                        elements.dataElements.splice(i, 1);
                                        deferred.resolve(true);
                                    }
                                }
                            } else {
                                console.log("deleteError: " + deleteCode);
                                deferred.reject(false);
                            }
                        })
                        .error(function (deleteData, deleteCode) {
                            console.log("err: " + deleteCode);
                            deferred.reject(false);
                        });
                }
            })
            .error(function(data, errorCode) {
                console.log("getError: " + errorCode);
                deferred.reject(false);
            });


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
        isUnique: isUnique
    }

}]);