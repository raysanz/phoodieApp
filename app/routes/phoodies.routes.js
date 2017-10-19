const router = require('express').Router()
const phoodiesController = require('../controller/phoodies.controller')
// const phoodieModel = require('../models/phoodie.schema')
// const phoodiesService = require('../service/phoodies.service')({
//     modelService: phoodieModel
// });


module.exports = router


// ===========================================
router.post('/', phoodiesController.insert)
router.get('/', phoodiesController.getAll)
router.get('/:id', phoodiesController.getOneById)
router.put('/:id', phoodiesController.updateById)
router.delete('/:id', phoodiesController.removeById)