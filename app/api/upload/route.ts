import { getCurrentUser } from "@/lib/actions/user.action";
import dbConnect from "@/lib/mongoose";
import User, { IUser } from "@/models/User";
import Video, { IVideo } from "@/models/Video";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
    req: Request
) {
    try {
        const { userId } = auth()

        await dbConnect()
        const body: IVideo = await req.json()
        const user: IUser = await getCurrentUser();

        
       
        
        const {
            title,
            url: video,
            thumbnailUrl: photo
        } = body;

        

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!title) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }
        if (!video) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }
        if (!photo) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!user._id) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        const videoWithRef: IVideo = {
            title,
            url: video,
            thumbnailUrl: photo,
            user: user._id
        }

        const newVideo = await Video.create(videoWithRef)
        
        await User.findOneAndUpdate(
            {_id: user._id},
            { $push: {videos: newVideo._id}}
        )

        return NextResponse.json({newVideo, userId}) 
    } catch (error: any) {
        return NextResponse.json({error: error.message})
    }
}