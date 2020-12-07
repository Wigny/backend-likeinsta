import { Request, Response } from 'express';
import Post from '../models/Post';

export default {
  async store(req: Request, res: Response) {
    const post = await Post.findById(req.params.id);

    post!.likes += 1;

    await post!.save();

    req.socket.emit('like', post);
    return res.json(post);
  }
}
