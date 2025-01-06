'use client'
import { getCurrentUser, getUsersById } from '@/lib/actions/user.action'
import { getVideosByUsers } from '@/lib/actions/video.actions'
import { IUser } from '@/models/User'
import { IVideo } from '@/models/Video'
import React, { useEffect, useState } from 'react'
import UserVideos from '../profile/(components)/user-videos'

const Subscriptions = () => {

    const [videos, setVideos] = useState<IVideo[]>([])
    const [subscriptions, setSubcriptions] = useState<IUser[]>([])
    const [currentUser, setCurrentUser] = useState<IUser | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            
            // Get current user
            const userData: IUser = await getCurrentUser()
            setCurrentUser(userData)

            
            // Get subscriptions
            const users: IUser[] = await getUsersById(userData.subscribtions)
            // Get videos from subscriptions
            const videosData: IVideo[] = await getVideosByUsers(users)
            setVideos(videosData)
            
        }

        fetchData()
    }, [])

    if (currentUser === null) return

    // console.log(currentUser.subscribtions)
    
  return (
    <div className='flex items-center  justify-center w-full h-full text-4xl   font-bold'>
        <div className='flex-col space-y-5 text-center'>
            <div className='bg-gradient-to-r from-rose-500 to-blue-500  inline-block text-transparent bg-clip-text'>
                CHECK WHAT YOUT FAVOURITE CREATORS POSTED RECENTLY
            </div>
            <div className='text-3xl'>
                {/* QUICK STEAL CAUSE IM TIRED MAKE DIFFERENT COMPONENT LATER */}
                <UserVideos videos={videos} />
            </div>
        </div>
    </div>
  )
}

export default Subscriptions
