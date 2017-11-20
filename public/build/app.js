'use strict';

$(function () {
    angular.bootstrap(document, ['phoodieApp']);
});
"use strict";

////////// register controllers / dependencies 
(function () {
    "use strict";

    angular.module("phoodieApp", [

    // "angular-ui-router",
    "ui.router", "ui.bootstrap", "phoodieApp.main", "phoodieApp.services"]
    /// "phoodieApp.controller",


    ).config(RouteConfig).run(function ($rootScope, $document, $window) {

        $rootScope.$on('$stateChangeError', console.log.bind(console));
        $rootScope.$on("$stateChangeSuccess", function () {
            $document[0].body.scrollTop = $document[0].documentElement.scrollTop = 0;
        });
    });

    RouteConfig.$inject = ["$stateProvider", "$urlRouterProvider", "$locationProvider"];

    function RouteConfig($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise("/");
        $locationProvider.html5Mode(true);
    }
})();
'use strict';

//=================================================MODULE=============================================//

(function () {
    'use strict';

    angular.module('phoodieApp.main', ['ui.router']).config(RouteConfig);

    RouteConfig.$inject = ['$stateProvider'];

    function RouteConfig($stateProvider) {
        $stateProvider.state('app', {
            abstract: true,
            views: {
                root: {
                    templateUrl: "../public/modules/main-view/main-view.html",
                    controller: 'homeController as homeCtrl'

                }
            }
        }).state('app.phoodie', {
            url: '/phoodie',
            views: {
                'content@app': {
                    templateUrl: '../public/modules/list-view/list.html',
                    controller: 'phoodieListController as listCtrl',
                    resolve: {
                        allEntries: getAllEntries

                    }
                }
            }
        }).state('app.phoodie.detail', {
            url: '/:id',
            views: {
                'content@app': {
                    templateUrl: '../public/modules/detail-view/detail-view.html',
                    controller: 'phoodieDetailController as detailCtrl'
                }
            }
        });
    }

    function getAllEntries(phoodieService) {
        debugger;
        return phoodieService.getAll().then(function (data) {
            return data.item;
        }).catch(function (error) {
            console.log(error);
        });
    }
})();
"use strict";

/* global angular */
(function () {
    'use strict';

    angular.module("phoodieApp.services", []);
})();
"use strict";

/* global angular */
(function () {
    "use strict";

    angular.module("phoodieApp.main").controller("phoodieDetailController", PhoodieDetailController);
    PhoodieDetailController.$inject = ["phoodieService", "$stateParams", "$state"];

    function PhoodieDetailController(phoodieService, $stateParams, $state) {
        ////// the state params is saved as an object and when
        "use strict";

        var vm = this;
        init();

        function init() {
            if ($stateParams.id) {
                phoodieService.getById($stateParams.id).then(onGetByIdSuccess).catch(onError);
            }
        }

        function onGetByIdSuccess(data) {
            console.log(data.item);
            vm.formData = data.item;
            console.log(vm.formData);
        }

        function onError(data) {
            console.log("Error: " + data);
        }

        vm.update = function () {
            phoodieService.updateById(vm.formData).then(onUpdateSuccess).catch(onError);
        };

        function onUpdateSuccess(res) {
            console.log(res);
            $state.go('app.phoodie');
        }
        ///$state.go('app.proposals.list');
    }
})();
'use strict';

//===========================================CONTROLLER=====================================================//
(function () {
    'use strict';

    angular.module('phoodieApp.main').controller('phoodieListController', PhoodieListController);

    PhoodieListController.$inject = ['phoodieService', "$http"];

    function PhoodieListController(phoodieService, $http) {
        'use strict';

        var vm = this;
        // vm.allEntries = allEntries
        vm.line = "This is from the list controller";
        //vm.tagline = 'Hack The Planet!'
        vm.formData = {};
        vm.searchTerm = 'snacks';
        // vm.allEntries = function getAllEntries(phoodieService) {
        //     debugger

        // }
        vm.delete = function (id) {
            debugger;
            phoodieService.removeById(id).then(onDeleteSuccess).catch(onError);
        };

        function onDeleteSuccess(data) {
            debugger;
            vm.formData = null;
            var removeIndex = vm.allEntries.findIndex(function (element, index, allEntries) {
                return element._id === data.item._id;
            });
            vm.allEntries.splice(removeIndex, 1);
        }
        vm.insert = function () {

            phoodieService.insert(vm.formData).then(onInsertSuccess).catch(onError);
        };

        function onInsertSuccess(data) {

            vm.formData = null;
            if (data.item) {
                vm.allEntries.push(data.item);
            }
        }

        function onError(data) {
            console.log('Error: ' + data.errors);
        }

        // ///
        // function getFlickerPhotos(imageService) {
        //     return imageService.getPhotos()
        //         .then(function (response) {
        //             console.log(response.data.photos.photo);
        //             return response.data.photos.photo;
        //         })
        //         .catch(function (error) {
        //             console.log(error)
        //         });
        // }
        // ///
        init();

        function init() {
            getPhotos();

            return phoodieService.getAll().then(function (data) {

                vm.allEntries = data.items;
                console.log(vm.allEntries);
            }).catch(function (error) {
                console.log(error);
            });
        }

        function getPhotos() {
            $http.get('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=2a71ca417afbee1ea7e948e802e43561&tags=' + vm.searchTerm + '&per_page=100&page=1&format=json&nojsoncallback=1&api_sig=').then(function (res) {
                debugger;
                console.log(res.data.photos.photo);
                vm.flick = res.data.photos.photo;
            });
            debugger;
        };
    }
})();
'use strict';

/* global angular */
/* https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#data-services */
(function () {
    'use strict';

    angular.module("phoodieApp.services").factory('phoodieService', PhoodieServiceFactory);

    PhoodieServiceFactory.$inject = ['$http', '$q'];

    function PhoodieServiceFactory($http, $q) {
        return {
            getAll: getAll,
            getById: getById,
            insert: insert,
            updateById: updateById,
            removeById: removeById
        };

        function insert(data) {

            return $http.post('/api/phoodie', data).then(xhrSuccess).catch(onError);
        }

        function getAll() {

            return $http.get('/api/phoodie').then(xhrSuccess).catch(onError);
        }

        function getById(id) {
            debugger;
            return $http.get('/api/phoodie/' + id).then(xhrSuccess).catch(onError);
        }

        function updateById(data) {
            debugger;
            return $http.put('/api/phoodie/' + data._id, data).then(xhrSuccess).catch(onError);
        }

        function removeById(id) {
            debugger;
            return $http.delete('/api/phoodie/' + id).then(xhrSuccess).catch(onError);
        }

        function xhrSuccess(response) {

            return response.data;
        }

        function onError(error) {
            console.log(error.data);
            return $q.reject(error.data);
        }
    }
})();
'use strict';

//===========================================CONTROLLER=====================================================//
(function () {
    'use strict';

    angular.module('phoodieApp.main').controller('homeController', HomeController);

    HomeController.$inject = [];

    function HomeController() {
        'use strict';

        var vm = this;
        // vm.allEntries = allEntries
        vm.line = "This is from the main controller ";

        init();

        function init() {}
    }
})();