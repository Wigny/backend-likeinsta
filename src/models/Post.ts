import mongoose, { Schema, Document } from 'mongoose';

interface Post extends Document {
  author: string,
  place: string,
  description: string,
  hashtags: string,
  file: string,
  mimetype: string,
  likes: number
}

const schema = new Schema({
  author: String,
  place: String,
  description: String,
  hashtags: String,
  file: String,
  mimetype: String,
  likes: {
    type: Number,
    default: 0,
  }
}, {
  timestamps: true,
});


export default mongoose.model<Post>('Post', schema);
