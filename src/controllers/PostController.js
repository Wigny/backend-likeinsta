const Post = require('../models/Post');
const fs = require('fs');

module.exports = {
  async index(req, res) {
    const posts = await Post.find().sort('-createdAt');

    return res.json(posts);
  },

  async store(req, res) {
    const { author, place, description, hashtags } = req.body;

    let file = fs.readFileSync(req.file.path);
    let image = new Buffer(file, 'base64');

    const post = await Post.create({
      author,
      place,
      description,
      hashtags,
      image,
    });

    req.io.emit('post', post);
    return res.json(post);
  },

  async delete(req, res) {
    await Post.findByIdAndDelete(req.params.id);

    return res.json({ ok: true });
  }
}