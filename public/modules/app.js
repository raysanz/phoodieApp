////////// register controllers / dependencies 
(function () {
    "use strict";
    angular
        .module("phoodieApp", [

            "ui.router",
            "ui.bootstrap",
            "phoodieApp.main",
            "phoodieApp.services",
        ])
        .config(RouteConfig).run(function ($rootScope, $document, $window) {
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