const router = require('express').Router();
const moviesController = require('../../controllers/api/movies.controller');

router.post('/add-movie', moviesController.postMovie);

router.get('/screens/:id', moviesController.getScreenById);

router.get('/screens', moviesController.getAllScreens);

router.get('/:id', moviesController.getMovieTimes);

router.get('/', moviesController.getAllMovies);

module.exports = router;