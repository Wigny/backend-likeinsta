const express = require('express');
const PostController = require('./controllers/PostController');
const HomeController = require('./controllers/HomeController');
const LikeController = require('./controllers/LikeController');

const routes = new express.Router();

routes.get('/', HomeController.index);
routes.get('/posts', PostController.index);
routes.post('/posts', PostController.store);
routes.post('/posts/:id/like', LikeController.store);
routes.delete('/posts/:id', PostController.delete);

module.exports = routes;
