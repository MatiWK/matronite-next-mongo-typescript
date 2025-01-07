'use client'
import { Button } from '@/components/ui/button'
import { getCurrentUser, getVideoByUserId } from '@/lib/actions/user.action'
import { getVideoById, getVideosByTitle, updateViews } from '@/lib/actions/video.actions'
import { IUser } from '@/models/User'
import { IVideo } from '@/models/Video'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const VideoPage = () => {
    const [video, setVideo] = useState<IVideo | null>(null)
    const [user, setUser] = useState<IUser | null>()
    const [currentUser, setCurrentUser] = useState<IUser>()
    const params = useParams()

    useEffect(() => {

      const fetchData = async () => {
        var replaced = params.title.toString().replace(/%20/g, " ");
          const videoData: IVideo = await getVideoById(params.title.toString())
          setVideo(videoData)

          const reponseUser: IUser = await getCurrentUser()
          setCurrentUser(reponseUser)

          const userData: IUser = await getVideoByUserId(videoData)
          setUser(userData)

          if (reponseUser._id !== userData?._id) {
            await updateViews(videoData)
          }
      }

      fetchData()
    }, [params.title])

    if (!user) return null
    if (!currentUser) return null;


  return (
    <div className='py-16 px-8'>
      
      <div className=' md+1:min-h-[400px] sm:min-h-[300px] min-h-[200px] w-full relative aspect-video bg-black '>
      
        {video && (
            <video controls
            className='absolute inset-0 w-auto  h-full mx-auto'
            >
            <source src={video.url} type="video/mp4" />
        </video>
        )}
        
      </div>
      <div className='  flex items-center justify-between py-2 '>

        <div className='text-xl  text-white  font-bold'>
          {video?.title}
        </div>
        <div className='text-white font-semibold '>
          <h1>Views: {video?.views}</h1>
        </div>

      </div>
      <div className='flex gap-2 items-center w-3/4'>
      <div className='border-[3px] border-black rounded-full h-[50px]  w-[50px] relative'>
            <Image
            
            src={user.photo}
            fill
            alt={user?.clerkId}
            className='rounded-full shadow-xl object-cover object-center'
            />
        </div>
        <div className='flex flex-col gap-0'>
          <h1 className='text-white font-semibold'>{user.username}</h1>
          <h1 className='text-white text-sm '>Subscribers {user.subscribers?.length || 0}</h1>

        </div>
        

      </div>
      


    </div>
  )
}

export default VideoPage
