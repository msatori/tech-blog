const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require("./home-routes");
const dashboardRoutes = require('./dashboard-routes');

router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);
router.use('/', homeRoutes);


//in case a request is made to an endpoint that doesn' exist, an error code will be called
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;