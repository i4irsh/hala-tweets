import { model, Schema, Document } from 'mongoose';
import { Tweet } from '@interfaces/tweets.interface';

const tweetSchema: Schema = new Schema({
  _id: {
    type: String,
    required: true,
    unique: true,
  },
  text: {
    type: String,
    required: true,
    unique: false,
  },
});

const tweetModel = model<Tweet & Document>('Tweet', tweetSchema);

export default tweetModel;
