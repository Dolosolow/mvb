const router = require('express').Router();
const axios = require('axios');

router.get('/', (req, res, next) => { 
  res.render('add-movie');
})

router.post('/add',(req, res, next) => {
  const apiKey = process.env.APIKEY;
  const movieId = req.body.movieId;
  
  axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}&plot=full`)
  .catch(err => {
    next(err);
  })

  return res.status(200).json({ msg: 'movie added successfully' });
})

module.exports = router;

