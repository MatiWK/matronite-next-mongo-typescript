'use server';

import User, { IUser } from "@/models/User";
import dbConnect from "../mongoose";
import { currentUser } from "@clerk/nextjs/server";

export async function createUser(user: IUser) {
    try {
        await dbConnect();
        const newUser = await User.create(user)
        return JSON.parse(JSON.stringify(newUser))
    } catch (err) {
        console.log(err)
    }
}


export async function getUserByUserName(email: string) {
    try {
        await dbConnect()
        const foundUsers: IUser[] = await User.find({username: {$regex : email}})
        return JSON.parse(JSON.stringify(foundUsers))
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