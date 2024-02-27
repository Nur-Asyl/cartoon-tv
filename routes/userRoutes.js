const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController')

// middleware
const isAuthenticated = require('../middleware/authMiddleware');


router.get('/login', (req, res) => {
    res.render('login.ejs');
})

router.get('/signup', (req, res) => {
    res.render('signup.ejs');
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