import { Router } from 'express';
import multer, { memoryStorage } from 'multer';
import PostController from './controllers/PostController';
import HomeController from './controllers/HomeController';
import LikeController from './controllers/LikeController';

const routes = Router();
const upload = multer({
  storage: memoryStorage()
});

routes.get('/', HomeController.index);
routes.get('/posts', PostController.index);
routes.post('/posts', upload.single('file'), PostController.store);
routes.post('/posts/:id/like', LikeController.store);
routes.delete('/posts/:id', PostController.delete);

export default routes;
