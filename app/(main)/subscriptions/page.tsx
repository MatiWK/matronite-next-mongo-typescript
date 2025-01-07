'use client'
import { getCurrentUser, getUsersById } from '@/lib/actions/user.action'
import { getVideosByUsers } from '@/lib/actions/video.actions'
import { IUser } from '@/models/User'
import { IVideo } from '@/models/Video'
import React, { useEffect, useState } from 'react'
import UserVideos from '../profile/(components)/user-videos'
import { Types } from 'mongoose'
import SubscribedVideo from './(components)/subscribed-video'

export interface VideosWithUsers {
    _id?: Types.ObjectId;
    url: string;
    thumbnailUrl: string;
    views?: number;
    title: string;
    user: IUser;  // Reference to the user who uploaded the video
}

const Subscriptions = () => {

    const [videos, setVideos] = useState<IVideo[]>([])
    const [subscriptions, setSubcriptions] = useState<VideosWithUsers[]>([])
    const [currentUser, setCurrentUser] = useState<IUser | null>(null)


    useEffect(() => {
        const fetchData = async () => {
            
            // Get current user
            const userData: IUser = await getCurrentUser()
            setCurrentUser(userData)

            
            // Get subscriptions
            const users: IUser[] = await getUsersById(userData.subscribtions)
            // Get videos from subscriptions
            let videosData: VideosWithUsers[] = await getVideosByUsers(users)
            setSubcriptions(videosData)
            console.log(videosData)
            
        }

        fetchData()
    }, [])

    if (currentUser === null) return

    // console.log(currentUser.subscribtions)
    
  return (
    <div className='flex items-center  justify-center w-full h-full xl:text-4xl md:text-2xl text-lg my-5 font-bold'>
        <div className='flex-col space-y-5 text-center'>
            <div className='bg-gradient-to-r from-rose-500 to-blue-500  inline-block text-transparent bg-clip-text'>
                FAVOURITE CREATORS RECENT POSTS
            </div>
            <div className='text-3xl'>
                {/* QUICK STEAL CAUSE IM TIRED MAKE DIFFERENT COMPONENT LATER */}
                <SubscribedVideo videos={subscriptions}  />
            </div>
        </div>
    </div>
  )
}

export default Subscriptions
