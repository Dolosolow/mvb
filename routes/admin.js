const moviesController = require('../controllers/movies.controller');
const router = require('express').Router();

router.post('/add-movie', moviesController.postAddMovie);

router.get('/nowplaying', moviesController.getCurrentMoviesData);

router.get('/', moviesController.getAdminDash);


module.exports = router;

