const path = require('path')
const router = require('express').Router()
const phoodiesRoutes = require('./phoodies.routes')
const hackersRoutes = require("./hackers.routes");

// register routes ///////////////////////////
router.use('/api/phoodie', phoodiesRoutes)
router.use("/api/hackers", hackersRoutes);

router.get('/*', function (req, res) {
    res.sendFile('./public/index.html', {
        root: path.join(__dirname, '../..')
    })
})

// Handle API 404
router.use("/api/*", function (req, res, next) {
    res.sendStatus(404);
});

router.use(function (err, req, res, next) {
    // If the error object doesn't exists

    if (!err) {

        return next();
    }

    // Log it
    console.error(err.stack);

    // Redirect to error page
    res.sendStatus(500);
});

module.exports = router