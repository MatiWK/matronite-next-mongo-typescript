'use server';

import User, { IUser } from "@/models/User";
import dbConnect from "../mongoose";
import { currentUser } from "@clerk/nextjs/server";
import { IVideo } from "@/models/Video";

export async function createUser(user: IUser) {
    try {
        await dbConnect();
        const newUser = await User.create(user)
        return JSON.parse(JSON.stringify(newUser))
    } catch (err) {
        console.log(err)
    }
}


export async function getUserByUserName(searchQuery: string) {
    try {
        await dbConnect()
        const cleanedSearchString = searchQuery.trim()
        const splittedUsername =  '\\s*' + cleanedSearchString.split('').join('\\s*') + '\\s*';
        const regex = new RegExp(splittedUsername, 'i')
        const foundUsers: IUser[] = await User.find({username: regex})
        return JSON.parse(JSON.stringify(foundUsers))
    } catch (error) {
        console.log(error)
    }
}

export async function getUserByUserNameFromParams(username: string) {
    try {
        await dbConnect()
        const user: IUser | null = await User.findOne({username}) 
        return JSON.parse(JSON.stringify(user))
    } catch (error) {
        console.log(error)
    }
}

export async function getCurrentUser() {
    try {
        await dbConnect()
        const clerkUser = await currentUser()
        const user: IUser | null = await User.findOne({clerkId: clerkUser?.id})
        return JSON.parse(JSON.stringify(user))

    } catch (error) {
        console.log(error)
    }
}

export async function updateUser(user: IUser) {
    try {
        await dbConnect()
        const updatedUser: IUser | null = await User.findByIdAndUpdate({_id: user._id}, {username: user.username, photo: user.photo})
        return JSON.parse(JSON.stringify(updatedUser))
    } catch (error) {
        console.log(error)
    }
}

export async function getVideoByUserId(video: IVideo) {
    try {
        await dbConnect()
        const videoOfUser: IUser | null = await User.findOne({_id: video.user})
        return JSON.parse(JSON.stringify(videoOfUser))
    } catch (error) {
        console.log(error)
    }
}

export async function subscribe(currentUser: IUser, user: IUser) {
    try {
        await dbConnect()
        const currentUserUpdated: IUser | null = await User.findOneAndUpdate({_id: currentUser?._id}, { $push: {subscribtions: user._id} })
        return JSON.parse(JSON.stringify(currentUserUpdated))

    } catch (error) {
        console.log(error)
    }
}

export async function unSubscribe(currentUser: IUser, user: IUser) {
    try {
        await dbConnect()
        const currentUserUpdated: IUser | null = await User.findOneAndUpdate({_id: currentUser?._id},  { $pull : {subscribtions: user._id} }, { new: true})
        return JSON.parse(JSON.stringify(currentUserUpdated))

    } catch (error) {
        console.log(error)
    }
}

// await User.findOneAndUpdate(
//     {_id: user._id},
//     { $push: {videos: newVideo._id}}
// )


export async function isSubscribed(currentUser: IUser, user: IUser) {
    try {
        await dbConnect()
        if (user._id === undefined) return
        const isSubscribedToUser: IUser | null = await User.findOne({_id: currentUser._id})
        const userSet = new Set(isSubscribedToUser?.subscribtions)
        const isSubbed = userSet.has(user._id)
        return JSON.parse(JSON.stringify(userSet))

    } catch (error) {
        console.log(error)
    }
    
}
