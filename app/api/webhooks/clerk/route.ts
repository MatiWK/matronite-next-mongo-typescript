import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
// import { clerkClient } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import { createUser } from '@/lib/actions/user.action'

export async function POST(req: Request) {

}