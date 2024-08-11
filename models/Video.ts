import { model, models, Schema, Types } from "mongoose";

export interface IVideo {
    _id?: Types.ObjectId;
    url: string;
    thumbnailUrl: string;
    views?: number;
    title: string,
}

const videoSchema = new Schema<IVideo>({
    url: { type: String, required: true },
    thumbnailUrl: { type: String },
    views: { type: Number, default: 0 },
    title: { type: String, required: true }
})

const Video = models.Video || model<IVideo>("Video", videoSchema);

export default Video