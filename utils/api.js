const axios = require('axios');
const apiKey = process.env.APIKEY;

module.exports = {
  getMovieById: async (movieId) => {
    const movieData = await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}`);
    return movieData.data;
  }
}