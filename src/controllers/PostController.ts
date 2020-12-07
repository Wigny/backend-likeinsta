import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import Post from '../models/Post';
import path from 'path';
import intoStream from 'into-stream';
import { BlobServiceClient } from '@azure/storage-blob';
import dotenv from "dotenv";

dotenv.config();

const { CONNECT_STR, CONTAINER_NAME, ACCOUNT_NAME } = process.env;

export default {
  async index(_req: Request, res: Response) {
    const posts = await Post.find().sort('-createdAt');

    return res.json(posts);
  },

  async store(req: Request, res: Response) {
    const { originalname, size, buffer, mimetype } = req.file;

    const filename = uuid() + path.extname(originalname);
    const stream = intoStream(buffer);

    await BlobServiceClient
      .fromConnectionString(CONNECT_STR as string)
      .getContainerClient(CONTAINER_NAME as string)
      .getBlobClient(filename)
      .getBlockBlobClient()
      .uploadStream(stream, size, 20);

    const post = await Post.create({
      ...req.body,
      file: `https://${ACCOUNT_NAME}.blob.core.windows.net/${CONTAINER_NAME}/${filename}`,
      mimetype,
      likes: 0
    });

    req.socket.emit('post', post);
    return res.json(post);
  },

  async delete(req: Request, res: Response) {
    await Post.findByIdAndDelete(req.params.id);

    return res.json({ ok: true });
  }
}
