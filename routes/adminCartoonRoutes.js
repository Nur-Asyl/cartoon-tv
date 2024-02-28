const axios = require('axios');
const express = require('express');

const router = express.Router();

const cartoonController = require('../controllers/cartoonController')

router.post('/cartoons', async (req, res) => {
    try {
        const cartoon = await cartoonController.createCartoon(req.body);
        res.redirect('/admin/cartoons')
    } catch (error) {
        console.error('Error creating cartoon:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  router.get('/cartoons', async (req, res) => {
    try {
        const cartoons = await cartoonController.getCartoons();
        res.render('listCartoon', { cartoons, user: req.session.user});
    } catch (error) {
        console.error('Error getting cartoons:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.get('/cartoon', async (req, res) => {
    try {
        const cartoons = await cartoonController.getCartoons;
        res.render('addCartoon', { cartoons, user: req.session.user});
    } catch (error) {
        console.error('Error getting cartoons:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  router.get('/cartoons/:name', async (req, res) => {
    const { name } = req.params;
    try {
        const cartoon = await cartoonController.getCartoonByName(name);
        if (!cartoon) {
            return res.status(404).json({ error: 'Cartoon not found' });
        }
        res.render('updateCartoon', {cartoon})
    } catch (error) {
        console.error('Error getting cartoon by Name:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.post('/cartoons/:name', async (req, res) => {
    const { name } = req.params;
    try {
        const updatedCartoon = await cartoonController.updateCartoon(name, req.body);
        res.redirect("/admin/cartoons")
    } catch (error) {
        console.error('Error updating cartoon:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  router.get('/cartoon/:name', async (req, res) => {
    const { name } = req.params;
    try {
        const deletedCartoon = await cartoonController.deleteCartoon(name);
        res.redirect("/admin/cartoons")
    } catch (error) {
        console.error('Error deleting cartoon:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  
module.exports = router;