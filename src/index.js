import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { createServer } from 'http';
import socket from 'socket.io';
import routes from './routes';
import dotenv from "dotenv";

dotenv.config();

const { PORT, MONGODB_URL } = process.env;

const app = express();
const server = createServer(app);
const io = socket(server);

mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
});

app.use((req, _res, next) => {
  req.socket = io;
  next();
});

app.use(cors());

app.use(routes);

server.listen(PORT || 8080);
