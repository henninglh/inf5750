/**
 * dataElementService is responsible for maintaining the dataElements values.
 * This includes create \ edit \ delete \ get and other methods for handling and
 * using the data.
 */
app.service('dataElementService', ['$http', '$q', '$log', function($http, $q, $log) {

    // "Local" version of the data.
    var elements = null;

    /**
     * getAllElements finds all elements in the api, aswell as all fields
     * related to the data.
     * @returns Promise resolving the result of getting all values
     */
    function getAllElements() {
        var deferred = $q.defer();


        if (elements !== null) { // Check if we already retrieved the data

            deferred.resolve(elements);

        } else { // We need to fetch the data from the api

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

    /**
     * getElement retrieves single element, but:
     * We are dependant on having a full set of elements in mutiple cases,
     * like validation (uniqueness) and our initial list (for searching trough all elements).
     * As a tradeoff, we decided to load all elements initially. That means getAllElements
     * is called here, even if we just need 1 element.
     * @param elementId of the element we want
     * @returns Promise containing the elements requested
     */
    function getElement(elementId) {
        var deferred = $q.defer();

        // We call getAllElements directly, since it already checks if
        // the elements are fetched or not.
        getAllElements()
            .then(function(elements) {

                // Find the element in elements, where the ID match
                for(var i = 0; i < elements.dataElements.length; i++)
                    if (elements.dataElements[i].id === elementId)
                        return deferred.resolve(elements.dataElements[i]); // Return the resolve, to end code execution

            }, function(err) {

                deferred.reject(err);

            });

        return deferred.promise;
    }

    /**
     * deleteElement removes the given element from the api and the local data,
     * given that the api call deletes successfully.
     * @param elementId is the id of the element to delete
     * @returns Promise containing a msg or true, based on the outcome of the api call
     */
    function deleteElement(elementId) {
        var deferred = $q.defer();

        // Send DELETE request
        $http.delete('/api/dataElements/' + elementId)
            .success(function (deleteData, deleteCode) {
                // 404 = Server can't find the element (Already deleted?)
                if(deleteCode == 404 || deleteCode == 409) {
                    return deferred.reject({msg: "The element was not found"});
                }

                // 204 = no content (OK)
                else if(deleteCode == 204) {

                    // Update local data
                    for (var i = 0; i < elements.dataElements.length; i++) {
                        if (elements.dataElements[i].id === elementId) {
                            elements.dataElements.splice(i, 1);
                            deferred.resolve(true);
                        }
                    }
                // Status not accounted for, but most likely an error.
                } else {
                    $log.error("Can't delete element", deleteCode);
                    deferred.reject({msg: "Unknown error occurred"});
                }
            })

            // Status codes recognized as "errors", like 500
            .error(function (deleteData, deleteCode) {

                // 500 = Server can't delete the element for some reason
                if(deleteCode == 500) {
                    return deferred.reject({msg: "The server could not delete this element"});
                } else { // Status codes unaccounted for
                    deferred.reject({msg: "Unknown error occurred"});
                }

                $log.error("Can't delete element", deleteCode);
                deferred.reject(false);
            });

        return deferred.promise;
    }

    /**
     * updateElement takes a element (validated already) and updates the referenced ID(element.id)
     * @param element the complete object to update (including original data and changes)
     * @returns Promise containing the result of the api call, or an err (also result of api call)
     */
    function updateElement(element) {
        var deferred = $q.defer();

        // Sends a PUT request to the api with the givne ID and attaches the element object
        $http.put('/api/dataElements/' + element.id + '.json', element)
            .success(function(res) {
                getAllElements().then(function() {
                    for(var i = 0; i < elements.dataElements.length; i++) {

                        // Update the local element
                        if(elements.dataElements[i].id == res.lastImported) {
                            elements.dataElements[i] = element;
                            deferred.resolve(res);

                            // Returning promise to stop code execution
                            return deferred.promise;
                        }
                    }

                    // Couldn't find the element we wanted
                    deferred.reject();
                });
            })
            .error(function(err) {
                deferred.reject(err);
            });

        return deferred.promise;
    }

    /**
     * createElement creates an element based on the object given (Already validated)
     * @param element element to add
     * @returns Promise containing the result of the api call
     */
    function createElement(element) {
        var deferred = $q.defer();

        // Send a POST request to the resource, attached with the element to add.
        $http.post('/api/dataElements.json', element)
            .success(function(res) {
                getAllElements().then(function() {
                    if(!res.importConflicts) {
                        element.id = res.lastImported;
                        elements.dataElements.unshift(element); // Unshift to make the new element appear at the start of the list
                    }
                    deferred.resolve(res);
                });
            })
            .error(function(err) {
                deferred.reject(err);
            });

        return deferred.promise;
    }

    /**
     * Checks if a given key, value pair is unique for the local collection.
     * @param key key to check for
     * @param value value for the given key
     * @returns Promise containing the key, value and true\false based on the uniqueness
     */
    function isUnique(key, value) {
        var deferred = $q.defer();

        // Make sure we got all elements
        getAllElements().then(function() {

            // Look for duplicates
            for(var i = 0; i < elements.dataElements.length; i++)
                if(elements.dataElements[i][key] == value)
                    return deferred.resolve({key: key, value: value, unique: false}); // Dulpicate found

            return deferred.resolve({key: key, value: value, unique: true}); // Duplicate not found
        });

        return deferred.promise;
    }

    return {
        getElement: getElement,
        getAllElements: getAllElements,
        deleteElement: deleteElement,
        updateElement: updateElement,
        createElement: createElement,
        isUnique: isUnique,
        elements : elements
    }

}]);
