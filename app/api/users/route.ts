import dbConnect from "@/lib/mongoose";
import User from "@/models/User"
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    await dbConnect()
    
    try {
        const users = await User.find({});

        return NextResponse.json(users) 
    } catch (err: any) {
        return NextResponse.json({error: err.message})
    }
}