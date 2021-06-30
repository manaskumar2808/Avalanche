const express = require('express');

const Router = express.Router();

const isAuth = require('../middlewares/isAuth');

const saveControllers = require('../controllers/save');

Router.post('/save', isAuth, saveControllers.save);
Router.delete('/unsave/:parent/:id', isAuth, saveControllers.unsave);
Router.get('/:parent/saves', isAuth, saveControllers.savedItems);
Router.get('/issaved/:parent/:id', isAuth, saveControllers.issaved);

module.exports = Router;
