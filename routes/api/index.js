const router = require('express').Router();
const cartRoute = require('./cart');
const movieRoute = require('./movie');

router.use('/cart', cartRoute);

router.use('/movies', movieRoute);

module.exports = router;