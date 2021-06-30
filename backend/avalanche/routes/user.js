const express = require('express');

const Router = express.Router();

const isAuth = require('../middlewares/isAuth');

const userControllers = require('../controllers/user');

Router.get('/', isAuth, userControllers.getUsers);
Router.get('/current-user', isAuth, userControllers.getCurrentUser);
Router.get('/:userId', isAuth, userControllers.getUser);
Router.post('/add-user', isAuth, userControllers.addUser);
Router.patch('/update-user', isAuth, userControllers.updateUser);
Router.delete('/delete-user', isAuth, userControllers.deleteUser);

module.exports = Router;