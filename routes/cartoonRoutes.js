const axios = require('axios');
const express = require('express');

const router = express.Router();

const tmdbApiKey = '7d961f45a5a8f9c76a1d18beceded6b7';

async function getCartoons() {
  try {
      const response = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${tmdbApiKey}&with_genres=16`);
      return response.data.results.map(cartoon => ({
          id: cartoon.id,
          name: cartoon.name,
          posterPath: cartoon.poster_path ? `https://image.tmdb.org/t/p/w500${cartoon.poster_path}` : 'https://via.placeholder.com/1080x1580'
      }));
  } catch (error) {
      console.error('Error fetching cartoons:', error);
      throw error; 
  }
}

router.get('/cartoons', async (req, res) => {
  try {
      const cartoons = await getCartoons();
      console.log(cartoons)
      res.render('index', { cartoons, user: req.session.user });
  } catch (error) {
      console.error('Error rendering cartoons page:', error);
      res.status(500).send('Internal Server Error');
  }
});


module.exports = router;