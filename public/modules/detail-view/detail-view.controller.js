/* global angular */
(function () {
    "use strict";
    angular
        .module("phoodieApp.main")
        .controller("phoodieDetailController", PhoodieDetailController);
    PhoodieDetailController.$inject = ["phoodieService", "$stateParams", "$state"];

    function PhoodieDetailController(phoodieService, $stateParams, $state) {
        ////// the state params is saved as an object and when
        "use strict";
        var vm = this;
        init();

        function init() {
            if ($stateParams.id) {
                phoodieService
                    .getById($stateParams.id)
                    .then(onGetByIdSuccess)
                    .catch(onError);
            }
        }

        function onGetByIdSuccess(data) {
            console.log(data.item);
            vm.formData = data.item;
            console.log(vm.formData)
        }

        function onError(data) {
            console.log(`Error: ${data}`);
        }

        vm.update = () => {
            phoodieService
                .updateById(vm.formData)
                .then(onUpdateSuccess)
                .catch(onError)
        }


        function onUpdateSuccess(res) {
            console.log(res)
            $state.go('app.phoodie');
        }
        ///$state.go('app.proposals.list');
    }
})();