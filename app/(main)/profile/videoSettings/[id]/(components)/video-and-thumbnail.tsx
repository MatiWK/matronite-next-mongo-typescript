'use client'

import { uploadFile } from '@/lib/actions/fileUpload'
import { IVideo } from '@/models/Video'
import { PlayCircle } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

interface VideoAndThumbnailProps {
    video: IVideo,
    editing: boolean,
    photo: string | null,
    setPhoto: React.Dispatch<React.SetStateAction<string | null>>,
    active: string | null,
    setActive: React.Dispatch<React.SetStateAction<string | null>>,
}

const VideoAndThumbnail = ({video, editing, photo, setPhoto, active, setActive}: VideoAndThumbnailProps) => {

    const uploadImageToAWSS3 = async (e: React.ChangeEvent<HTMLInputElement>) => {


        if (e.target.files === null) return;

        if (e.target.files.length === 0) return;

        
        const file = e.target.files[0];
        
        const arrayBuffer = await file.arrayBuffer();
        const base64String = Buffer.from(arrayBuffer).toString('base64');  
    
        const response = await uploadFile(base64String, file.name);  
        setPhoto(`https://matronite-final-bucket-v4.s3.eu-north-1.amazonaws.com/${response.fileName}${response.dateFileId}`)

        if (response) {
            toast.success("Thumbnail has been uploaded successfully")
        } else {
            toast.error("Thumbnail upload has failed")
        }

    };

  return (
    <div className='grid grid-cols-2 gap-5  bg-violet-700 rounded-xl p-10'>
                <div className='flex flex-col justify-center items-center gap-2 px-2'>
                        <h1 className='text-2xl font-semibold text-white mr-auto'>Video:</h1>
                    <div className='bg-violet-900 w-full  aspect-video rounded-xl relative border-4 border-violet-900 shadow-xl'>
                        <video controls className='h-full w-full  rounded-xl shadow-xl' >
                            <source src={video?.url} type="video/mp4" />
                        </video>
                    </div>
                </div>
                {editing && <div/>}
                <div className='flex flex-col justify-center items-center gap-2 px-2'>
                <h1 className='text-2xl font-semibold text-white mr-auto'>{!photo && !editing ? "Thumbnail:" : "Pick your thumbnail:"}</h1>

                    <div 
                    onClick={() => {
                        setActive(video.thumbnailUrl)
                    }}
                    className={`bg-violet-900 ${editing && "hover:border-orange-300 hover:-translate-y-1 active:border-2"}  w-full shadow-xl aspect-video rounded-xl relative border-4 border-violet-900 cursor-pointer  transition-all group
                    ${active === video.thumbnailUrl && editing && "border-orange-300"}
                    `}>
                        <Image 
                            src={video.thumbnailUrl}
                            fill
                            alt="photo"
                            className='object-cover object-center rounded-xl'
                        />
                        <PlayCircle 
                        height={80}
                        width={80}
                        className='text-white opacity-0 group-hover:opacity-100 group-hover:scale-110 absolute z-50 top-1/2 -translate-y-[50%] left-1/2 -translate-x-[50%]   transition-all'
                        />
                    </div>
                </div>
                <div>
                    {photo && editing && (
                         <div className='flex flex-col justify-center items-center gap-2 px-2 relative'>
                            
                            <div 
                            onClick={() => {
                                setActive(photo)
                            }}
                            className={`bg-violet-900 mt-10  w-full shadow-xl aspect-video rounded-xl relative hover:-translate-y-1 active:border-2 hover:border-orange-300 border-4 border-violet-900 cursor-pointer  transition-all group  
                                ${active === photo && " border-orange-300"}
                                `}>
                                <Image 
                                    src={photo}
                                    fill
                                    alt="photo"
                                    className='object-cover object-center rounded-xl '
                                />
                                <PlayCircle 
                                height={80}
                                width={80}
                                className='text-white opacity-0 group-hover:opacity-100 group-hover:scale-110 absolute z-50 top-1/2 -translate-y-[50%] left-1/2 -translate-x-[50%]   transition-all'
                                />
                            </div>
                         </div>
                    )}
                </div>
                {editing && (
                    <div className='flex items-center gap-5'>
                        <h1 className='text-2xl font-semibold text-white  '>Upload a new thumbnail:</h1>
                        <label className="bg-slate-300 p-5 rounded-xl hover:bg-slate-500 transition-all cursor-pointer" >
                            <div className='flex justify-center items-center h-full 
                            font-bold text-xl '>
                                Upload
                            </div>
                            <input
                            onChange={(e) => uploadImageToAWSS3(e)}
                            accept="image/png, image/jpeg" type="file" className='hidden'/>
                        </label>
                    </div>
                )}
            </div>
  )
}

export default VideoAndThumbnail
