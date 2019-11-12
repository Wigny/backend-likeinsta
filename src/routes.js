const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');
const PostController = require('./controllers/PostController');
const HomeController = require('./controllers/HomeController');
const LikeController = require('./controllers/LikeController');

const routes = new express.Router();
const upload = multer(uploadConfig);

routes.get('/', HomeController.index);
routes.get('/posts', PostController.index);
routes.post('/posts', upload.single('image'), PostController.store);
routes.post('/posts/:id/like', LikeController.store);
routes.delete('/posts/:id', PostController.delete);

module.exports = routes;
