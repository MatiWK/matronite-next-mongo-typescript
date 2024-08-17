'use server'

import Video, { IVideo } from "@/models/Video"
import dbConnect from "../mongoose"
import { IUser } from "@/models/User"

export async function getVideosByUserId(user: IUser) {
    try {
        await dbConnect()
        const videos: IVideo[] = await Video.find({user: user._id})
        return JSON.parse(JSON.stringify(videos))
    } catch (error) {
        console.log(error)
    }
}

export async function getVideosByTitle(title: string) {
    try {
        await dbConnect()
        const video: IVideo | null = await Video.findOne({title})
        return JSON.parse(JSON.stringify(video))
    } catch (error) {
        console.log(error)
    }
}

