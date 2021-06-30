const express = require('express');

const Router = express.Router();

const isAuth = require('../middlewares/isAuth');

const likeControllers = require('../controllers/like');

Router.post('/like', isAuth, likeControllers.like);
Router.delete('/unlike/:parent/:id', isAuth, likeControllers.unlike);
Router.get('/likes/:parent/:id', isAuth, likeControllers.likesCount);
Router.get('/isliked/:parent/:id', isAuth, likeControllers.isliked);

module.exports = Router;
