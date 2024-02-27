const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController')


router.get('/login', (req, res) => {
    res.render('login.ejs');
})

router.get('/signup', (req, res) => {
    res.render('signup.ejs');
})

router.post('/login', userController.login);

router.post('/signup', userController.signup);

router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        
        res.render('index.ejs', { weatherData: null, forecastData: null, user: null});
    })
});


router.get('/findAll', userController.findAll);

router.get('/findOne/:id', userController.findOne);

router.put('/update/:id', userController.update);

router.delete('/destroy/:id', userController.delete);


module.exports = router