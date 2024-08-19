'use server'

import Video, { IVideo } from "@/models/Video"
import dbConnect from "../mongoose"
import { IUser } from "@/models/User"
import { NextResponse } from "next/server"

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

export async function getVideoById(id: string) {
    try {
        await dbConnect()
        const video: IVideo | null = await Video.findOne({_id: id})
        return JSON.parse(JSON.stringify(video))
    } catch (error) {
        console.log(error)
    }
}

export async function updateViews(video: IVideo) {
    try {
        await dbConnect()
        await Video.findOneAndUpdate({_id: video._id}, {$inc: {views: 1}})
    } catch (error) {
        console.log(error)
    }
}

export async function getVideosById(users: IUser[]) {
    if (!users) return

    const allVideos = []
    try {
        await dbConnect()
        for (const user of users) {
            
            const video= await Video.findOne({_id: user.videos[user.videos.length - 1]})
            if (video === null) continue
            allVideos.push({
                user,
                video
            })
        }
        return JSON.parse(JSON.stringify(allVideos))
    } catch (error) {
        console.log(error)
    }
}