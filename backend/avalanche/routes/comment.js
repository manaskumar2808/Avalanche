const express = require('express');

const Router = express.Router();

const isAuth = require('../middlewares/isAuth');

const commentControllers = require('../controllers/comment');

Router.get('/:id/parent/:parent', isAuth, commentControllers.getComments);
Router.get('/:id/parent/:parent/count', isAuth, commentControllers.getCommentsCount);
Router.get('/:commentId', isAuth, commentControllers.getComment);
Router.post('/add', isAuth, commentControllers.addComment);
Router.patch('/:commentId/update', isAuth, commentControllers.updateComment);
Router.delete('/:commentId/delete', isAuth, commentControllers.deleteComment);

module.exports = Router;