'use client'
import { Button } from '@/components/ui/button'
import { IVideo } from '@/models/Video'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import axios from 'axios'
import { uploadFile } from '@/lib/actions/fileUpload'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'


interface LocalVideo {
    title: string,
    video: string,
    photo: string
}

const initialState = {message: null}

const UploadVideo = () => {
    const [isMounted, setIsMounted] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')
    const [video, setVideo] = useState<string>('')
    const [photo, setPhoto] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const { getToken } = useAuth(); // Get the function to retrieve the token
    const router = useRouter()

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null


    

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            const token = await getToken();

            if (!token) {
                console.error("No token found");
                return;
            }

            const data = {
                title,
                url: video,
                thumbnailUrl: photo
            };

            const response = await axios.post("http://localhost:3000/api/upload", data, {
                headers: {
                    Authorization: `Bearer ${token}`,  // Attach Clerk token to the request
                    'Content-Type': 'application/json'  // Ensure the correct content type
                }
            });

            console.log('Data posted successfully:', response.data);
            toast.success("Video has Been Uploaded!")
        } catch (error) {
            console.error('Error posting data:', error);
            toast.error("Error occured during video creation")
        }
    };

    const cancel = (e: SyntheticEvent) => {
        e.preventDefault()
        setVideo(''),
        setPhoto(''),
        setTitle('')
        router.push("/community")
    }

    const uploadImageToAWSS3 = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoading(true)
        if (e.target.files === null) return;
        
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

        setLoading(false)
    };

    const uploadVideoToAWSS3 = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoading(true)
        if (e.target.files === null) return;
        
        const file = e.target.files[0];
        
        const arrayBuffer = await file.arrayBuffer();
        const base64String = Buffer.from(arrayBuffer).toString('base64');  
    
        const response = await uploadFile(base64String, file.name);  
        setVideo(`https://matronite-final-bucket-v4.s3.eu-north-1.amazonaws.com/${response.fileName}${response.dateFileId}`)

        if (response) {
            toast.success("Video has been uploaded successfully")
        } else {
            toast.error("Video upload has failed")
        }
        setLoading(false)
     };

    

  return (
    <div className=' min-w-[600px] p-8 '>
      <h1 className='text-8xl font-bold py-8 w-full'>Upload</h1>
      <form onSubmit={(e) => submit(e)} className='flex-col space-y-5'>
        <div className='flex flex-col '>
            <label className='text-2xl font-bold ' htmlFor="">Title:</label>
            <input
            disabled={loading}
            required
            className='rounded-xl p-2 w-full text-black font-bold focus:outline-none border-2 focus:border-black border-transparent'
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />
        </div>
        <div className='flex flex-col gap-2'>
            <label className='text-2xl font-bold rounded-xl  ' htmlFor="">Video:</label>
            <label className='bg-white hover:bg-slate-300  w-[200px] shadow-xl cursor-pointer 
            hover:-translate-y-1 transition-all duration-500 aspect-square rounded-xl'>
                <div className='flex justify-center items-center h-full
                font-bold text-xl '>
                    Upload
                </div>
                <input 
                disabled={loading}
                required
                onChange={(e) => uploadVideoToAWSS3(e)}
                accept='video/mp4' type="file" className='hidden'/>
            </label>
        </div>
        <div className='flex flex-col gap-2'>
            <label className='text-2xl font-bold rounded-xl  ' htmlFor="">Thumbnail:</label>
            <label className='bg-white hover:bg-slate-300  w-[200px] shadow-xl cursor-pointer 
            hover:-translate-y-1 transition-all duration-500 aspect-square rounded-xl'>
                <div className='flex justify-center items-center h-full
                font-bold text-xl '>
                    Upload
                </div>
                <input 
                disabled={loading}
                required
                onChange={(e) => uploadImageToAWSS3(e)}
                accept="image/png, image/jpeg" type="file" className='hidden'/>
            </label>
        </div>

        <div className='flex gap-2 w-full justify-end'>
            <Button disabled={loading} size="xl" type="submit" >Upload</Button>
            <Button disabled={loading} variant="destructive" type="button" onClick={(e) => cancel(e)} size="xl">Cancel</Button>
        </div>
      </form>
    </div>
  )
}

export default UploadVideo
