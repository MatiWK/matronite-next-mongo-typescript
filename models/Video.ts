import { Types } from "mongoose";

export interface IVideo {
    _id: Types.ObjectId;
    url: string;
    thumbnailUrl: string;
    views: number;
     
}