'use server';

import User, { IUser } from "@/models/User";
import dbConnect from "../mongoose";

export async function createUser(user: IUser) {
    try {
        await dbConnect();
        const newUser = await User.create(user)
        return JSON.parse(JSON.stringify(newUser))
    } catch (err) {
        console.log(err)
    }
}