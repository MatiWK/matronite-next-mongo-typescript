import { model, models, Schema, Types } from "mongoose";
import { IUser } from './User';  // Import IUser if needed for TypeScript

export interface IVideo {
    _id?: Types.ObjectId;
    url: string;
    thumbnailUrl: string;
    views?: number;
    title: string;
    user: Types.ObjectId | IUser;  // Reference to the user who uploaded the video
}

const videoSchema = new Schema<IVideo>({
    url: { type: String, required: true },
    thumbnailUrl: { type: String },
    views: { type: Number, default: 0 },
    title: { type: String, required: true },
    user: { type: Types.ObjectId, ref: 'User' }  // Add a reference to the User model
});

const Video = models.Video || model<IVideo>("Video", videoSchema);

export default Video;
