const router = require('express').Router()
const hackersController = require('../controller/hackers.controller')()

module.exports = router

// api routes ===========================================================
router.get('/', hackersController.getAll)
router.get('/:id', hackersController.getOneById)
router.post('/', hackersController.insert)
router.put('/:id', hackersController.updateById)
router.delete('/:id', hackersController.removeById)