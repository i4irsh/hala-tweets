import { model, Schema, Document } from 'mongoose';
import { User } from '@interfaces/users.interface';

const userSchema: Schema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  twitterUserId: {
    type: String,
    required: true,
    unique: true,
  },
  accessToken: {
    type: String,
    required: false,
    unique: false,
  },
  accessSecret: {
    type: String,
    required: false,
    unique: false,
  },
});

const userModel = model<User & Document>('User', userSchema);

export default userModel;
