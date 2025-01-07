import { IVideo } from '@/models/Video'
import { PlayCircleIcon, VideoIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { VideosWithUsers } from '../page'

interface subscribedVideoProps {
  videos: VideosWithUsers[]
}


const SubscribedVideo = ({
  videos
}: subscribedVideoProps) => {
  return (
    <div className='2xl:w-[1050px] xl+1:w-[900px]  md+1:w-[750px]  md:w-[700px] w-[80%]  mx-auto'>
      <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-5 py-16  '>
      {videos.map((video: VideosWithUsers) => (
    <Link 
        href={"/video/" + video._id}
        key={video._id?.toString()}
    >
        <div className='group bg-black rounded-xl aspect-video relative hover:scale-110 transition-all'>
            <Image 
                alt="thumbnail"
                src={video.thumbnailUrl}
                fill
                className='object-cover p-2 object-center rounded-xl opacity-70 group-hover:opacity-100  transition-all'
            />
            <PlayCircleIcon 
                className='z-50 absolute top-1/2 -translate-y-[50%] left-1/2 -translate-x-[50%] group-hover:scale-110 duration-500' 
                color='white' 
                height={80} 
                width={80} 
            />
        </div>
        <div className='p-1 text-white flex justify-between items-center'>
          <div className='flex items-end gap-2'>
            <div className='relative h-[50px] w-[50px] bg-black rounded-full border-2 border-black'>
              <Image 
              src={video.user.photo}
              alt="avatar"
              fill
              className='rounded-full border-2 border-black object-cover object-center'
              />
            </div>
            <div className=' text-left flex flex-col '>
              <h1 className='font-semibold text-lg '>{video.title.length < 30 ? video.title : `${video.title.substring(0,30)}...`} </h1>
              <h2 className='font-thin text-sm'>
                {video.user.username !== null && video.user.username.length < 20 ? video.user.username : `${video.user.username?.substring(0,20)}...`}
              </h2>
            </div>
            
          </div>
          <p className='text-sm'>Views: {video.views}</p>
        </div>
        
    </Link>
))}



        
      </div>
      </div>
  )
}

export default SubscribedVideo
