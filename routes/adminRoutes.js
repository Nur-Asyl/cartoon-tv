const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

const isAdmin = require('../middlewares/adminMiddleware')

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.render('admin', { users, user: req.session.user});
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/add', isAdmin ,(req, res) => {
    res.render('addUser', {user: req.session.user});
});

router.post('/add', isAdmin, async (req, res) => {
    try {
        const { username, password, adminStatus } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            password: hashedPassword,
            creationDate: new Date(),
            adminStatus
        });

        await newUser.save();

        res.redirect('/admin');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/edit/:id', isAdmin, async (req, res) => {
    try {
        const userEdit = await User.findById(req.params.id);
        res.render('editUser', { userEdit, user: req.session.user });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/update/:id', isAdmin, async (req, res) => {
    try {
        const { username, password } = req.body;
        await User.findByIdAndUpdate(req.params.id, { username, password, updatedDate: new Date() });
        res.redirect('/admin');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/delete/:id', isAdmin, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.redirect('/admin');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
