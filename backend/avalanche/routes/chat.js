const express = require('express');

const Router = express.Router();

const isAuth = require('../middlewares/isAuth');

const chatControllers = require('../controllers/chat');

Router.get('/:roomId', isAuth, chatControllers.fetchChats);
Router.post('/add', isAuth, chatControllers.addChat);
Router.delete('/delete/:chatId', isAuth, chatControllers.deleteChat);

module.exports = Router;