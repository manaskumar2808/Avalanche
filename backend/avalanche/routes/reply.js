const express = require('express');

const Router = express.Router();

const isAuth = require('../middlewares/isAuth');

const replyControllers = require('../controllers/reply');

Router.get('/', isAuth, replyControllers.getReplies);
Router.get('/comment/:commentId/', isAuth, replyControllers.getCommentReplies);
Router.post('/add', isAuth, replyControllers.addReply);
Router.patch('/:replyId/update', isAuth, replyControllers.updateReply);
Router.delete('/:replyId/delete', isAuth, replyControllers.deleteReply);

module.exports = Router;