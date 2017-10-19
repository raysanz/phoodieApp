//===========================================CONTROLLER=====================================================//
(function () {
    'use strict'

    angular.module('phoodieApp.main')
        .controller('homeController', HomeController)

    HomeController.$inject = []

    function HomeController() {
        'use strict'
        var vm = this
        // vm.allEntries = allEntries
        vm.line = "This is from the main controller "

        init()

        function init() {

        }
    }
})()