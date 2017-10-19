const responses = require('../models/responses');
const path = require('path');
const apiPrefix = '/api/hackers';
const hackerModel = require('../models/hacker');
const hackersService = require('../service/hackers.service')({
    modelService: hackerModel
});

module.exports = hackersController;

function hackersController() {
    return {
        getAll: getAll,
        getOneById: getOneById,
        insert: insert,
        updateById: updateById,
        removeById: removeById
    };

    function getAll(req, res) {
        hackersService
            .getAll()
            .then(hackers => {
                const responseModel = new responses.ItemsResponse();
                responseModel.items = hackers;
                res.json(responseModel);
            })
            .catch(err => {
                res.status(500).send(new responses.ErrorResponse(err));
            });
    }

    function getOneById(req, res) {
        let queryCondition = {
            _id: req.params.id
        };

        hackersService
            .getOne(queryCondition)
            .then(hacker => {
                const responseModel = new responses.ItemResponse();
                responseModel.item = hacker;
                res.json(responseModel);
            })
            .catch(err => {
                return res.status(500).send(new responses.ErrorResponse(err));
            });
    }

    function insert(req, res) {
        debugger
        hackersService
            .insert(req.body)
            .then(hacker => {
                const responseModel = new responses.ItemResponse();
                responseModel.item = hacker;
                res
                    .status(201)
                    .location(path.join(apiPrefix, hacker._id.toString()))
                    .json(responseModel);
            })
            .catch(err => {
                return res.status(500).send(new responses.ErrorResponse(err));
            });
    }

    function updateById(req, res) {
        let queryCondition = {
            _id: req.params.id
        };
        hackersService
            .updateOne(queryCondition, req.body)
            .then(hacker => {
                const responseModel = new responses.ItemResponse();
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
        hackersService
            .removeOne(queryCondition)
            .then(hacker => {
                const responseModel = new responses.ItemResponse();
                responseModel.item = hacker;
                res.json(responseModel);
            })
            .catch(err => {
                return res.status(500).send(new responses.ErrorResponse(err));
            });
    }

}