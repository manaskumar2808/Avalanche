const express = require('express');

const Router = express.Router();

const isAuth = require('../middlewares/isAuth');

const requestControllers = require('../controllers/request');

Router.get('/received', isAuth, requestControllers.getReceivedRequests);
Router.get('/sent', isAuth, requestControllers.getSentRequests);
Router.post('/add-request/:receiverId', isAuth, requestControllers.addRequest);
Router.get('/is-requested/:userId', isAuth, requestControllers.isRequested);
Router.get('/has-requested/:userId', isAuth, requestControllers.hasRequested);
Router.patch('/accept/:userId', isAuth, requestControllers.acceptRequest);
Router.delete('/reject/:userId', isAuth, requestControllers.rejectRequest);
Router.delete('/delete/:userId', isAuth, requestControllers.deleteRequest);

module.exports = Router;