//===========================================CONTROLLER=====================================================//
(function () {
    'use strict'

    angular.module('phoodieApp.main')
        .controller('phoodieListController', PhoodieListController)

    PhoodieListController.$inject = ['phoodieService']

    function PhoodieListController(phoodieService) {
        'use strict'

        var vm = this
        // vm.allEntries = allEntries
        vm.line = "This is from the list controller"
        //vm.tagline = 'Hack The Planet!'
        vm.formData = {}
        // vm.allEntries = function getAllEntries(phoodieService) {
        //     debugger

        // }
        vm.delete = (id) => {
            debugger
            phoodieService
                .removeById(id)
                .then(onDeleteSuccess)
                .catch(onError)
        }

        function onDeleteSuccess(data) {
            debugger
            vm.formData = null
            let removeIndex = vm.allEntries.findIndex((element, index, allEntries) => {
                return element._id === data.item._id
            })
            vm.allEntries.splice(removeIndex, 1)
        }
        vm.insert = () => {

            phoodieService.insert(vm.formData)
                .then(onInsertSuccess)
                .catch(onError)
        }

        function onInsertSuccess(data) {

            vm.formData = null
            if (data.item) {
                vm.allEntries.push(data.item)
            }
        }

        function onError(data) {
            console.log(`Error: ${data.errors}`)
        }


        console.log(vm.getAll)

        function init() {

            return phoodieService
                .getAll()
                .then(data => {

                    vm.allEntries = data.items;
                    console.log(vm.allEntries)
                })
                .catch(error => {
                    console.log(error);
                });
        }

        init()

    }
})()