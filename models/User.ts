import { Schema, model, Document, models, Types } from 'mongoose';
import { IVideo } from './Video';

export interface IUser{
  _id?: Types.ObjectId;
  clerkId: string;
  email: string;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  photo: string;
  videos: Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true},
  firstName: { type: String },
  lastName: { type: String},
  photo: { type: String, required: true },
  videos: [{ type: Types.ObjectId, ref: "Video", default: []}]
  
});

const User = models.User || model<IUser>('User', userSchema);

export default User;
