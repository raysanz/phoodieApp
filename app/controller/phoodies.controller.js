const responses = require('../models/responses')
const path = require('path')
const apiPrefix = '/api/phoodie'
const phoodieModel = require('../models/phoodie.schema')
const phoodiesService = require('../service/phoodies.service')({
    modelService: phoodieModel
});
module.exports = {
    insert: insert,
    getAll: getAll,
    getOneById: getOneById,
    updateById: updateById,
    removeById: removeById
}


function insert(req, res) {
    debugger
    phoodiesService
        .insert(req.body)
        .then(entry => {
            const responseModel = new responses.ItemResponse();
            responseModel.item = entry;
            res
                .status(201)
                .location(path.join(apiPrefix, entry._id.toString()))
                .json(responseModel);
        })
        .catch(err => {

            return res.status(500).send('failure')
        });
    console.log('hey rudy')
}

function getAll(req, res) {

    phoodiesService
        .getAll()
        .then(entry => {

            const responseModel = new responses.ItemsResponse();
            responseModel.items = entry;
            res.json(responseModel);
        })
        .catch(err => {
            res.status(500).send(new responses.ErrorResponse(err));
        });
}

function getOneById(req, res) {
    let queryCondition = {
        _id: req.params.id
    }
    phoodiesService
        .getOne(queryCondition)
        .then(entry => {
            const responseModel = new responses.ItemResponse();
            responseModel.item = entry;
            res.json(responseModel);
        })
        .catch(err => {
            return res.status(500).send(new responses.ErrorResponse(err));
        });
}

function updateById(req, res) {
    let queryCondition = {
        _id: req.params.id
    };
    phoodiesService
        .updateOne(queryCondition, req.body)
        .then(entry => {
            const responseModel = new responses.ItemResponse();
            responseModel.item = entry
            res.status(204).json(responseModel);
        })
        .catch(err => {
            return res.status(500).send(new responses.ErrorResponse(err.stack));
        });
}

function removeById(req, res) {
    let queryCondition = {
        _id: req.params.id
    };
    phoodiesService
        .removeOne(queryCondition)
        .then(entry => {
            const responseModel = new responses.ItemResponse();
            responseModel.item = entry;
            res.json(responseModel);
        })
        .catch(err => {
            return res.status(500).send(new responses.ErrorResponse(err));
        });
}