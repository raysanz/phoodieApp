//===========================================CONTROLLER=====================================================//
(function () {
    'use strict'

    angular.module('phoodieApp.main')
        .controller('phoodieListController', PhoodieListController)

    PhoodieListController.$inject = ['phoodieService', "$http"]

    function PhoodieListController(phoodieService, $http) {
        'use strict'

        var vm = this
        // vm.allEntries = allEntries
        vm.line = "This is from the list controller"
        //vm.tagline = 'Hack The Planet!'
        vm.formData = {}
        vm.searchTerm = 'snacks'
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
        init()

        function init() {
            ///getPhotos()
            getRestaurant()
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

        function getRestaurant() {
            $http
                .get(`https://api.yelp.com/v3/businesses/searchs?term=food&location=San+Francisco`)
                .then(function (res) {
                    console.log(res)
                })

        }
        https: //api.yelp.com/v2/search?term=food&location=San+Francisco

            function getPhotos() {
                $http
                    .get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=2a71ca417afbee1ea7e948e802e43561&tags=${vm.searchTerm}&per_page=100&page=1&format=json&nojsoncallback=1&api_sig=`)
                    .then(function (res) {
                        debugger
                        console.log(res.data.photos.photo)
                        vm.flick = res.data.photos.photo
                    })
                debugger
            };

    }
})()