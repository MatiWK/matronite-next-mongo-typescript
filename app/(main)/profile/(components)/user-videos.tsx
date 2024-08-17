import { IVideo } from '@/models/Video'
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
        {videos.map((video) => (
            <Link 
            href={"/video/" + video.title}
            key={video._id?.toString()}
            >
            <div
            
            className='bg-black rounded-xl  aspect-video relative'>
                <Image 
                alt="chuj"
                src={video.thumbnailUrl}
                fill
                className='object-cover object-center'
                />
            </div>
            </Link>
        ))}


        
      </div>
      </div>
  )
}

export default UserVideos
