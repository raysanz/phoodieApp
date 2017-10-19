/* global angular */
/* https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#data-services */
(function () {
    'use strict'

    angular.module("phoodieApp.services")
        .factory('phoodieService', PhoodieServiceFactory)

    PhoodieServiceFactory.$inject = ['$http', '$q']

    function PhoodieServiceFactory($http, $q) {
        return {
            getAll: getAll,
            getById: getById,
            insert: insert,
            updateById: updateById,
            removeById: removeById
        }

        function insert(data) {

            return $http.post('/api/phoodie', data)
                .then(xhrSuccess)
                .catch(onError)
        }

        function getAll() {

            return $http.get('/api/phoodie')
                .then(xhrSuccess)
                .catch(onError)
        }


        function getById(id) {
            debugger
            return $http.get(`/api/phoodie/${id}`)
                .then(xhrSuccess)
                .catch(onError)
        }

        function updateById(data) {
            debugger
            return $http.put(`/api/phoodie/${data._id}`, data)
                .then(xhrSuccess)
                .catch(onError)
        }

        function removeById(id) {
            debugger
            return $http.delete(`/api/phoodie/${id}`)
                .then(xhrSuccess)
                .catch(onError)
        }

        function xhrSuccess(response) {


            return response.data
        }


        function onError(error) {
            console.log(error.data);
            return $q.reject(error.data)
        }
    }
})()