const axios = require('axios');
const express = require('express');
const fetch = require('node-fetch');

const router = express.Router();

const tmdbApiKey = '7d961f45a5a8f9c76a1d18beceded6b7';

const apiKey = 'f8b08e40447f4763a773f0f746878d5e';
const apiUrl = 'https://newsapi.org/v2/everything';

const cartoonController = require('../controllers/cartoonController')
const userController = require('../controllers/userController')

const User = require('../models/user')

async function getCartoons() {
  try {
      const response = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${tmdbApiKey}&with_genres=16`);
      const cartoons = response.data.results;
    
      const genreResponse = await axios.get(`https://api.themoviedb.org/3/genre/tv/list?api_key=${tmdbApiKey}`);
      const genresMap = {};
      genreResponse.data.genres.forEach(genre => {
          genresMap[genre.id] = genre.name;
      });

      cartoons.forEach(async cartoon => {
        try {
            let exist = await cartoonController.getCartoonById(cartoon.id);
            if (!exist) {
                await cartoonController.createCartoon(cartoon);
            } 
        } catch (error) {
            console.error('Error checking cartoon existence or creating cartoon:', error);
        }
    });
    
    
      

      return cartoons.map(cartoon => ({
          id: cartoon.id,
          name: cartoon.name,
          posterPath: cartoon.poster_path ? `https://image.tmdb.org/t/p/w500${cartoon.poster_path}` : 'https://via.placeholder.com/1080x1580',
          rating: cartoon.vote_average.toFixed(1),
          adult: cartoon.adult,
          backdropPath: cartoon.backdrop_path ? `https://image.tmdb.org/t/p/w500${cartoon.backdrop_path}` : '',
          genres: cartoon.genre_ids.map(genreId => genresMap[genreId]),
          originCountry: cartoon.origin_country,
          originalLanguage: cartoon.original_language,
          originalName: cartoon.original_name,
          overview: cartoon.overview,
          popularity: cartoon.popularity,
          firstAirDate: cartoon.first_air_date,
          voteCount: cartoon.vote_count
      }));
  } catch (error) {
      console.error('Error fetching cartoons:', error);
      throw error; 
  }
}

router.get('/cartoons', async (req, res) => {
  try {
      const cartoons = await getCartoons();
      const responseNews = await fetch(`${apiUrl}?q=cartoons&apiKey=${apiKey}`);
      const newsData = await responseNews.json();
      
      const newsArticles = newsData.articles;
      
      res.render('index', { cartoons, newsArticles, user: req.session.user });
  } catch (error) {
      console.error('Error rendering cartoons page:', error);
      res.status(500).send('Internal Server Error');
  }
});

router.get('/cartoons/:id', async (req, res) => {
    try {
        const cartoonId = req.params.id;
        const response = await axios.get(`https://api.themoviedb.org/3/tv/${cartoonId}?api_key=${tmdbApiKey}`);
        const cartoon = response.data;

        if (req.session.user) {
            const userId = req.session.user._id; 
            
            const user = await User.findById(userId);
            if (user) {
                const { recentlyViewed } = user;
                
                if (recentlyViewed.length >= 10) {
                    recentlyViewed.shift(); 
                }
                
                recentlyViewed.push(cartoonId);
                
                await User.findByIdAndUpdate(userId, { recentlyViewed });
            }
        }
        const responseNews = await fetch(`${apiUrl}?q=cartoons&apiKey=${apiKey}`);
        const newsData = await responseNews.json();
        
        const newsArticles = newsData.articles;
        res.render('cartoon-details', { cartoon,  newsArticles, user: req.session.user});
    } catch (error) {
        console.error('Error fetching cartoon details:', error);
        res.status(500).send('Internal Server Error');
    }
});



module.exports = router;