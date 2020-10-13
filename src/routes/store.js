const moviesController = require('../controllers/movies.controller');
const router = require('express').Router();

router.get('/dining', (req, res, next) => {
  res.render('wine-dine', { transNav: false, path: '/dining', user: req.user ? req.user.id : null })
});

router.get('/events', (req, res, next) => {
  res.render('events', { transNav: false, path: '/events', user: req.user ? req.user.id : null })
});

router.get('/membership', (req, res, next) => {
  res.render('membership', { transNav: true, path: '/membership', user: req.user ? req.user.id : null })
});

router.get('/membership/gold', (req, res, next) => {
  res.render('signup-gold', { transNav: false, path: '/membership', user: req.user ? req.user.id : null })
});

router.get('/membership/silver', (req, res, next) => {
  res.render('signup-silver', { transNav: false, path: '/membership', user: req.user ? req.user.id : null })
});

router.get('/location', (req, res, next) => {
  res.render('locations', { transNav: false, path: '/location', user: req.user ? req.user.id : null })
});

router.get('/checkout', (req, res, next) => {
  res.render('checkout', { transNav: false, path: '/', user: req.user ? req.user.id : null })
});

router.get('/movies/:id', moviesController.getMovieById);

router.get('/', moviesController.getMovies);

module.exports = router;