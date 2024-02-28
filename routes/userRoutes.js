const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController')
const User = require('../models/user');
const axios = require('axios')


const tmdbApiKey = '7d961f45a5a8f9c76a1d18beceded6b7';

// middleware
const isAuthenticated = require('../middlewares/authMiddleware');

router.get('/recently-viewed', isAuthenticated, async (req, res) => {
    try {
        
        const userId = req.session.user._id; 
        
        const user = await User.findById(userId);
    
        const { recentlyViewed } = user;
        
        const promises = recentlyViewed.map(async cartoonId => {
            const response = await axios.get(`https://api.themoviedb.org/3/tv/${cartoonId}?api_key=${tmdbApiKey}`);
            return response.data;
        });
        
        const recentlyViewedCartoons = await Promise.all(promises);
        
        res.render('recently-viewed', { recentlyViewedCartoons });
    

    } catch (error) {
        console.error('Error fetching recently viewed cartoons:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/login', (req, res) => {
    res.render('login.ejs', {err: null});
})

router.get('/signup', (req, res) => {
    res.render('signup.ejs', {err: null});
})

router.post('/login', userController.login);

router.post('/signup', userController.signup);

router.post('/logout', isAuthenticated, (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        
        res.redirect('/cartoons')
    })
});


router.get('/findAll', isAuthenticated, userController.findAll);

router.get('/findOne/:id', isAuthenticated, userController.findOne);

router.put('/update/:id', isAuthenticated, userController.update);

router.delete('/destroy/:id', isAuthenticated, userController.delete);


module.exports = router