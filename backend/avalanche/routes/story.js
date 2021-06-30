const express = require('express');

const Router = express.Router();

const storyControllers = require('../controllers/story');

const isAuth = require('../middlewares/isAuth');

Router.get('/', isAuth, storyControllers.getActiveStories);
Router.get('/:storyId', isAuth, storyControllers.getStory);
Router.post('/add', isAuth, storyControllers.addStory);
Router.patch('/:storyId/update', isAuth, storyControllers.updateStory);
Router.delete('/:storyId/delete', isAuth, storyControllers.deleteStory);

module.exports = Router;