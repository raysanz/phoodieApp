module.exports = hackersService

function hackersService(options) {
    let Hacker

    if (!options.modelService) {
        throw new Error('Options.modelService is required')
    }

    Hacker = options.modelService

    return {
        getAll: getAll,
        getOne: getOne,
        insert: insert,
        updateOne: updateOne,
        removeOne: removeOne
    }

    function getAll() {
        return Hacker.find()
    }

    function getOne(queryCondition) {
        return Hacker.findOne(queryCondition)
    }

    function insert(document) {
        let hacker = new Hacker(document)
        return hacker.save()
    }

    function updateOne(queryCondition, doc) {
        return Hacker.findOneAndUpdate(queryCondition, doc, {
            new: true
        })
    }

    function removeOne(queryCondition) {
        return Hacker.findOneAndRemove(queryCondition)
    }
}