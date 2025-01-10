import { Button } from '@/components/ui/button'
import { IVideo } from '@/models/Video'
import { Edit, EllipsisVertical, PlayCircleIcon, Trash, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import Modal from './modal'

interface userVideoProps {
    videos: IVideo[]
}


const UserVideos = ({
    videos
}: userVideoProps) => {
    const [open, setOpen] = useState<boolean>(false) 
    const [edit, setEdit] = useState<IVideo | null>(null)
    
  return (
    <div className='2xl:w-[1050px] xl+1:w-[900px]  md+1:w-[750px]  md:w-[700px] w-[80%]  mx-auto'>
      <div className='grid lg:grid-cols-4 md:grid-cols-2 gap-5 py-16  '>
      {videos.map((video: IVideo) => (
    <Link 
        href={"/video/" + video._id}
        key={video._id?.toString()}
        
    >
        <div className='group bg-black rounded-xl aspect-video  relative hover:-translate-y-1 transition-all '>
            <Image 
                alt="thumbnail"
                src={video.thumbnailUrl}
                fill
                className='object-cover  object-center p-1   rounded-xl opacity-70 group-hover:opacity-100  transition-all '
            />
            <PlayCircleIcon 
                className='z-50 absolute top-1/2 -translate-y-[50%] left-1/2 -translate-x-[50%] group-hover:scale-110 duration-500' 
                color='white' 
                height={80} 
                width={80} 
            />
            
        </div>
        <div className='p-1 text-white flex justify-between items-center'>
            <div>
                <h1 className='font-semibold'>{video.title}</h1>
                <p className='text-sm'>Views: {video.views}</p>
            </div>
            <div className='relative'>
               
                <button onClick={(e) => {
                    e.preventDefault()
                    setOpen(true)
                    setEdit(video)
                }}>
                    <EllipsisVertical 
                    className='hover:text-slate-500 transition-colors'
                    />
                    
                </button>
            </div>
        </div>
        
        
    </Link>
))}
        
      </div>
            <Modal 
            open={open}
            setOpen={setOpen}
            edit={edit}
            />
      </div>
  )
}

export default UserVideos
