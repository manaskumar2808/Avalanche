const express = require('express');

const Router = express.Router();

const isAuth = require('../middlewares/isAuth');

const friendControllers = require('../controllers/friend');

Router.post('/friend/:userId', isAuth, friendControllers.friend);
Router.delete('/unfriend/:userId', isAuth, friendControllers.unfriend);
Router.get('/friends', isAuth, friendControllers.getFriends);
Router.get('/friends-count/:userId', isAuth, friendControllers.getFriendsCount);
Router.get('/requests', isAuth, friendControllers.getRequests);
Router.get('/is-friend/:userId', isAuth, friendControllers.isfriend);

module.exports = Router;