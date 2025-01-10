'use client'
import { Button } from '@/components/ui/button'
import React, { SyntheticEvent, useEffect, useState, CSSProperties } from 'react'
import axios from 'axios'
import { uploadFile } from '@/lib/actions/fileUpload'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import Image from 'next/image'
import { PlayCircle } from 'lucide-react'
import Loaders from '@/components/loaders'


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
    const [loadingMessage, setLoadingMessage] = useState<"Video" | "Thumbnail">("Thumbnail")

    const { getToken } = useAuth(); // Get the function to retrieve the token
    const router = useRouter()

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null


    

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        setLoadingMessage("Video")
        setLoading(true)

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

            // PRODUCTION : https://matronite-next-mongo-typescript.vercel.app/api/upload
            // LOCAL: http://localhost:3000/api/upload
            const response = await axios.post("http://localhost:3000/api/upload", data, {
                headers: {
                    Authorization: `Bearer ${token}`,  // Attach Clerk token to the request
                    'Content-Type': 'application/json'  // Ensure the correct content type
                }
            });

            console.log('Data posted successfully:', response.data);
            toast.success("Video has Been Uploaded!")
            // TODO: PUSH BACK TO PROFILE
            router.push("/profile")

        } catch (error) {
            console.error('Error posting data:', error);
            toast.error("Error occured during video creation")
        } finally {
            setLoading(false)

        }
    };

    const cancel = (e: SyntheticEvent) => {
        e.preventDefault()
        setVideo(''),
        setPhoto(''),
        setTitle('')
        setLoading(false)
        router.push("/profile")
    }

    const uploadImageToAWSS3 = async (e: React.ChangeEvent<HTMLInputElement>) => {

        setLoadingMessage("Thumbnail")

        if (e.target.files === null) return;

        if (e.target.files.length === 0) return;

        setLoading(true)
        
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

        setLoadingMessage("Video")

        if (e.target.files === null) return;
        
        setLoading(true)

        const file = e.target.files[0];

        // Create a FormData object to send ther file as binary
        const formData = new FormData();
        formData.append("file", file)
        // formData.append("fileName", file.name)
        
        // const arrayBuffer = await file.arrayBuffer();
        // const base64String = Buffer.from(arrayBuffer).toString('base64');  
    
        // const response = await uploadFile(base64String, file.name);  
        // setVideo(`https://matronite-final-bucket-v4.s3.eu-north-1.amazonaws.com/${response.fileName}${response.dateFileId}`)

        // if (response) {
        //     toast.success("Video has been uploaded successfully")
        // } else {
        //     toast.error("Video upload has failed")
        // }

        try {
            const response = await fetch('http://localhost:3000/api/upload/video', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                setVideo(result.fileUrl);
                toast.success('Video has been uploaded successfully!');
            } else {
                toast.error(result.error || 'Video upload failed.');
            }
        } catch (error) {
            console.error('Upload error:', error);
            toast.error('An error occurred during upload.');
        } 
        setLoading(false);

     };

    

  return (
    <div className=' max-w-[1000px] w-[90%] p-8 '>
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
            <div className='flex gap-5'>
                <label className={` w-[200px] shadow-xl aspect-square rounded-xl ${!loading && "bg-white hover:bg-slate-300 cursor-pointer  hover:-translate-y-1 transition-all duration-500"}`}>
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
                {video.length > 0 && (
                    <div className='bg-black h-[200px]  aspect-video rounded-xl relative border-2 border-black shadow-xl'>
                    <video controls className='h-full w-full rounded-xl' >
                        <source src={video} type="video/mp4" />
                    </video>
                </div>
                )}
            </div>
        </div>
        <div className='flex flex-col gap'>
            <label className='text-2xl font-bold rounded-xl  ' htmlFor="">Thumbnail:</label>
            
            <div className='flex gap-5'>
            <label className={`   w-[200px] shadow-xl aspect-square rounded-xl ${!loading && "bg-white hover:bg-slate-300 cursor-pointer  hover:-translate-y-1 transition-all duration-500"}`}>
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
            {photo.length > 0 && (
                <div>
                    <div className='bg-black  h-[200px] shadow-xl aspect-video rounded-xl relative border-2 border-black hover:scale-105  transition-all group'>
                        <Image 
                            src={photo}
                            fill
                            alt="photo"
                            className='object-cover object-center rounded-xl'
                        />
                        <PlayCircle 
                        height={80}
                        width={80}
                        className='text-white  absolute top-1/2 -translate-y-[50%] left-1/2 -translate-x-[50%] group-hover:scale-110 transition-transform '
                        />
                    </div>
                </div>
            )}
            </div>
            
        </div>

        <div className='flex gap-2 w-full justify-end'>
            <Button disabled={loading} size="xl" type="submit" >Upload</Button>
            <Button variant="destructive" type="button" onClick={(e) => cancel(e)} size="xl" className='z-[2]'>Cancel</Button>
        </div>
      </form>
      
 
        <Loaders 
        loading={loading}
        loadingMessage={loadingMessage}
        />

      
    </div>
  )
}

export default UploadVideo


