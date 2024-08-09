import { Schema, model, Document, models, Types } from 'mongoose';

export interface IUser extends Document {
    _id: Types.ObjectId;
    clerkId: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    photo: string
}

const userSchema = new Schema<IUser>({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, unique: true },
  firstName: { type: String },
  lastName: { type: String},
  photo: { type: String, required: true },
});

const User = models.User || model<IUser>('User', userSchema);

export default User;
