'use client'
import { getUserByUserNameFromParams } from '@/lib/actions/user.action'
import { getVideosByUserId } from '@/lib/actions/video.actions'
import { IUser } from '@/models/User'
import { IVideo } from '@/models/Video'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import UserVideos from '../../profile/(components)/user-videos'

const ChannelPage = () => {
    const [user, setUser] = useState<IUser | null>(null)
    const [videos, setVideos] = useState<IVideo[]>([])

    const params = useParams()
    
    useEffect(() => {
        const fetchData = async () => {
            const userData = await getUserByUserNameFromParams(params.username.toString()) 
            setUser(userData)

            const userVideos = await getVideosByUserId(userData)
            setVideos(userVideos)
        }

        fetchData()
    }, [params.username])

    if (user === null) return null


  return (
    <div className='w-full h-full'> 
      <div className='bg-black aspect-[5/1] 2xl:w-[1200px] xl+1:w-[1100px] xl:w-[1000px] lg+1:w-[900px] lg:w-[970px] md+1:w-[800px]  md:w-[700px] w-[80%] mx-auto mt-16 mb-8 rounded-2xl flex justify-center items-center'>
        <h1 className='md:text-5xl text-xl text-white font-bold '>YOUR BANNER</h1>
      </div>
      <div>
        
      </div>
      <div className='items-center  2xl:w-[1200px] xl+1:w-[1100px] xl:w-[1000px] lg+1:w-[900px] lg:w-[970px] md+1:w-[800px]  md:w-[700px] w-[80%] mx-auto  rounded-2xl flex  gap-2'>
        <div className='border-[6px] border-black rounded-full md:h-[170px] sm:h-[100px] h-[70px] aspect-square relative'>
            <Image
            src={user.photo}
            fill
            alt={user?.clerkId}
            className='rounded-full shadow-xl object-cover   object-center'
            />
        </div>
        <div className='text-white flex flex-col gap-2 py-2 '>
            <h1 className='font-bold text-xl md:text-3xl shadow-xl p-1'> {user.username !== null && user.username.length > 20 ? `${user.username?.substring(0,20)}...` : user.username}</h1>
            <div className='flex gap-2 px-1'>
                <p className='text-sm md:text-md'>Subscribers: TODO </p>
                <p className='text-sm md:text-md'>Videos: {user.videos.length} </p>
            </div>
            <p className='hidden md:flex px-1 max-w-[400px] text-sm md:text-md'>Bio: TODO m Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys stand</p>
        </div>
        
      </div>

      <UserVideos 
      videos={videos}
      />
      
    </div>
  )
}

export default ChannelPage
