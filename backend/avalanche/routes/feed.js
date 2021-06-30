const express = require('express');

const Router = express.Router();

const isAuth = require('../middlewares/isAuth');

const feedControllers = require('../controllers/feed');

Router.get('/', isAuth, feedControllers.getFeeds);
Router.get('/:feedId', isAuth, feedControllers.getFeed);
Router.get('/creator/:creatorId', isAuth, feedControllers.getUserFeeds);
Router.post('/add', isAuth, feedControllers.addFeed);
Router.patch('/:feedId/update', isAuth, feedControllers.updateFeed);
Router.delete('/:feedId/delete', isAuth, feedControllers.deleteFeed);

module.exports = Router;