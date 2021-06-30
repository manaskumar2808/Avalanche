const express = require('express');
const { getFriendSuggestions, getFollowSuggestions } = require('../controllers/suggestions');
const isAuth = require('../middlewares/isAuth');

const Router = express.Router();

Router.get('/friend', isAuth, getFriendSuggestions);
Router.get('/follow', isAuth, getFollowSuggestions);

module.exports = Router;