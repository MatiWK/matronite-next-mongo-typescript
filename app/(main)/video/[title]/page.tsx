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
    const [currentUser, setCurrentUser] = useState<IUser | null>()
    const params = useParams()

    useEffect(() => {

      const fetchData = async () => {
        var replaced = params.title.toString().replace(/%20/g, " ");
          const videoData: IVideo = await getVideoById(params.title.toString())
          setVideo(videoData)

          const userData: IUser = await getVideoByUserId(videoData)
          setCurrentUser(userData)
      }

      fetchData()
    }, [params.title])

    if (!currentUser) return null


  return (
    <div className='py-16 px-8'>
      
      <div className='md:w-3/4'>
      
        {video && (
            <video controls >
            <source src={video.url} type="video/mp4" />
        </video>
        )}
        
      </div>
      <div className=' text-xl py-2 text-white  font-bold w-3/4'>
        {video?.title}
        
      </div>
      <div className='flex gap-2 items-center w-3/4'>
      <div className='border-[3px] border-black rounded-full h-[50px]  aspect-square relative'>
            <Image
            
            src={currentUser.photo}
            fill
            alt={currentUser?.clerkId}
            className='rounded-full shadow-xl'
            />
        </div>
        <div className='flex flex-col gap-0'>
          <h1 className='text-white font-semibold'>{currentUser.username}</h1>
          <h1 className='text-white text-sm '>Subscribers {currentUser.subscribers?.length || 0}</h1>

        </div>
        

      </div>
      <div className='text-white font-semibold py-5'>
        <h1>Views: {video?.views}</h1>
      </div>



    </div>
  )
}

export default VideoPage
