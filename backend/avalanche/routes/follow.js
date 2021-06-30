const express = require('express');

const Router = express.Router();

const isAuth = require('../middlewares/isAuth');

const followControllers = require('../controllers/follow');

Router.post('/follow/:userId', isAuth, followControllers.follow);
Router.delete('/unfollow/:userId', isAuth, followControllers.unfollow);
Router.get('/followers/:userId', isAuth, followControllers.getFollowers);
Router.get('/followeds/:userId', isAuth, followControllers.getFolloweds);
Router.get('/followers-count/:userId', isAuth, followControllers.getFollowersCount);
Router.get('/followeds-count/:userId', isAuth, followControllers.getFollowedsCount);
Router.get('/is-follower/:userId', isAuth, followControllers.isfollower);
Router.get('/is-following/:userId', isAuth, followControllers.isfollowing);

module.exports = Router;