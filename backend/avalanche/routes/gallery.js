const express = require('express');

const Router = express.Router();

const isAuth = require('../middlewares/isAuth');

const galleryControllers = require('../controllers/gallery');

Router.post('/add', isAuth, galleryControllers.addGallery);
Router.delete('/delete/:galleryId', isAuth, galleryControllers.deleteGallery);

module.exports = Router;