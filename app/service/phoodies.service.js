module.exports = phoodiesService

function phoodiesService(options) {
    let Submission
    if (!options.modelService) {
        throw new Error('missing model service')
    }
    Submission = options.modelService

    return {
        insert: _insert,
        getAll: getAll,
        getOne: getOne,
        updateOne: updateOne,
        removeOne: removeOne
    }



    function _insert(document) {
        
        let entry = new Submission(document)
        return entry.save()
    }

    function getAll() {
        
        var results = Submission.find()

        return Submission.find()
    }

    function getOne(queryCondition) {
        return Submission.findOne(queryCondition)
    }

    function updateOne(queryCondition, doc) {
        return Submission.findOneAndUpdate(queryCondition, doc, {
            new: true
        })
    }

    function removeOne(queryCondition) {
        return Submission.findOneAndRemove(queryCondition)
    }
}