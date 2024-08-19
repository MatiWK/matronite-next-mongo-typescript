import { IVideo } from '@/models/Video'
import { PlayCircleIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface userVideoProps {
    videos: IVideo[]
}


const UserVideos = ({
    videos
}: userVideoProps) => {
  return (
    <div className='2xl:w-[1200px] xl+1:w-[1100px] xl:w-[1000px] lg+1:w-[900px] lg:w-[970px] md+1:w-[800px]  md:w-[700px] w-[80%]  mx-auto'>
      <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-3 py-16  '>
      {videos.map((video: IVideo) => (
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
        <div className='p-1 text-white'>
        <h1 className='font-semibold'>{video.title}</h1>
        <p className='text-sm'>Views: {video.views}</p>
        </div>
        
    </Link>
))}



        
      </div>
      </div>
  )
}

export default UserVideos
