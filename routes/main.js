const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.render('main', { transNav: true });
})

module.exports = router;