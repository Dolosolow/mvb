const moviesController = require('../controllers/movies.controller');
const router = require('express').Router();

router.get('/movies/:id', moviesController.getMovieDetails)

router.get('/dining', (req, res, next) => {
  res.render('wine-dine', { transNav: false, path: '/dining' })
})

router.get('/events', (req, res, next) => {
  res.render('events', { transNav: false, path: '/events' })
})

router.get('/membership', (req, res, next) => {
  res.render('membership', { transNav: false, path: '/membership' })
})

router.get('/membership/gold', (req, res, next) => {
  res.render('signup-gold', { transNav: false, path: '/membership' })
})

router.get('/membership/silver', (req, res, next) => {
  res.render('signup-silver', { transNav: false, path: '/membership' })
})

router.get('/location', (req, res, next) => {
  res.render('locations', { transNav: false, path: '/location' })
})

router.get('/', moviesController.getCurrentMovies)

module.exports = router;