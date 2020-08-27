const moviesController = require('../controllers/movies.controller');
const router = require('express').Router();

router.get('/', moviesController.getAdminDash);

module.exports = router;

