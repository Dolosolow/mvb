const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.render('main', { transNav: true, isAdmin: false, currentPg: 'm' });
})

router.get('/dining', (req, res, next) => {
  res.render('wine-dine', { transNav: false, isAdmin: false, currentPg: 'wd' })
})

router.get('/events', (req, res, next) => {
  res.render('events', { transNav: false, isAdmin: false, currentPg: 'ev' })
})

router.get('/membership', (req, res, next) => {
  res.render('membership', { transNav: false, isAdmin: false, currentPg: 'mbs' })
})

router.get('/membership/gold', (req, res, next) => {
  res.render('signup', { transNav: false, isAdmin: false, currentPg: 'mbs' })
})

router.get('/location', (req, res, next) => {
  res.render('locations', { transNav: false, isAdmin: false, currentPg: 'loc' })
})

module.exports = router;