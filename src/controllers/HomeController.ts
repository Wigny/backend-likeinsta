import { Request, Response } from 'express';

export default {
  async index(_req: Request, res: Response) {
    return res.send('Olá');
  }
}
