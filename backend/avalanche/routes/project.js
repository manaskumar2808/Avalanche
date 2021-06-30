const express = require('express');

const Router = express.Router();

const projectControllers = require('../controllers/project');

Router.get('/', projectControllers.getProjects);
Router.get('/:projectId', projectControllers.getProject);
Router.post('/add', projectControllers.addProject);
Router.patch('/:projectId/update', projectControllers.updateProject);
Router.delete('/:projectId/delete', projectControllers.deleteProject);

module.exports = Router;