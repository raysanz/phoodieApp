//=================================================MODULE=============================================//

(function () {
    'use strict'
    angular.module('phoodieApp.main', ['ui.router'])
        .config(RouteConfig);

    RouteConfig.$inject = ['$stateProvider'];

    function RouteConfig($stateProvider) {
        $stateProvider
            .state('app', {
                abstract: true,
                views: {
                    root: {
                        templateUrl: "../public/modules/main-view/main-view.html",
                        controller: 'homeController as homeCtrl',

                    }
                }
            })
            .state('app.phoodie', {
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
            })
            .state('app.phoodie.detail', {
                url: '/:id',
                views: {
                    'content@app': {
                        templateUrl: '../public/modules/detail-view/detail-view.html',
                        controller: 'phoodieDetailController as detailCtrl',
                    }
                }
            })
    }

    function getAllEntries(phoodieService) {
        debugger
        return phoodieService
            .getAll()
            .then(data => {
                return data.item;
            })
            .catch(error => {
                console.log(error);
            });
    }
})();