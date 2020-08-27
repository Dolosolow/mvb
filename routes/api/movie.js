const router = require('express').Router();
const moviesController = require('../../controllers/api/movies.controller');

router.get('/:id', moviesController.getMovieTimes);

router.post('/add-movie', moviesController.postMovie)

module.exports = router;