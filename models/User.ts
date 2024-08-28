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
  banner?: string | null;
  subscribers?: number; // people who are subscriber to this users account
  subscribtions?: Types.ObjectId[]; // all users this user is subscribed to
  bio?: string;
  videos: Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true},
  firstName: { type: String },
  lastName: { type: String},
  photo: { type: String, required: true },
  banner: {type: String || null, default: null},
  subscribers: {type: Number, default: 0},
  subscribtions: {type: Types.ObjectId, ref: "User", default: []},
  bio: { type: String, default: "" },
  videos: [{ type: Types.ObjectId, ref: "Video", default: []}]
  
});

const User = models.User || model<IUser>('User', userSchema);

export default User;
