import dbConnect from "@/lib/mongoose";
import User from "@/models/User"
import Video from "@/models/Video";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    
    await dbConnect()
    
    try {
        const videos = await Video.find({});

        return NextResponse.json(videos) 
    } catch (err: any) {
        return NextResponse.json({error: err.message})
    }
}