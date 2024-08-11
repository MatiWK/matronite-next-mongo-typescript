'use client'
import { Button } from '@/components/ui/button'
import { getCurrentUser } from '@/lib/actions/user.action'
import { IUser } from '@/models/User'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Profile = () => {
    const [currentUser, setCurrentUser] = useState<IUser | null>()
    
    useEffect(() => {
        const getUser = async () => {
            const data = await getCurrentUser()
            
            setCurrentUser(data)
        }
        getUser()
    }, [])
    

    if (!currentUser) return null

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
            src={currentUser.photo}
            fill
            alt={currentUser?.clerkId}
            className='rounded-full shadow-xl'
            />
        </div>
        <div className='text-white flex flex-col gap-2 py-2 '>
            <h1 className='font-bold text-xl md:text-3xl shadow-xl p-1'> {currentUser.username !== null && currentUser.username.length > 20 ? `${currentUser.username?.substring(0,20)}...` : currentUser.username}</h1>
            <div className='flex gap-2 px-1'>
                <p className='text-sm md:text-md'>Subscribers: TODO </p>
                <p className='text-sm md:text-md'>Videos: TODO</p>
            </div>
            <p className='hidden md:flex px-1 max-w-[400px] text-sm md:text-md'>Bio: TODO m Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys stand</p>
        </div>
        <div className='flex mt-auto gap-2'>
            <Link href="/upload">
            <Button className='' size="lg">Upload a new Video</Button>
            </Link>
            <Link href="/profileSettings">
            <Button className='' variant="secondary" size="lg">Settings</Button>
            </Link>
        </div>
      </div>
        

      <div className='2xl:w-[1200px] xl+1:w-[1100px] xl:w-[1000px] lg+1:w-[900px] lg:w-[970px] md+1:w-[800px]  md:w-[700px] w-[80%]  mx-auto'>
      <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-3 py-16  '>
        <div className='bg-black rounded-xl  aspect-video relative'>
        
        </div>
        <div className='bg-black rounded-xl  aspect-video'></div>
        <div className='bg-black rounded-xl  aspect-video'></div>
        <div className='bg-black rounded-xl  aspect-video'></div>
        <div className='bg-black rounded-xl  aspect-video'></div>
        <div className='bg-black rounded-xl  aspect-video'></div>
      </div>
      </div>
    </div>
  )
}

export default Profile


// <Image 
//         alt="chuj"
//         src="https://matronite-final-bucket-v4.s3.eu-north-1.amazonaws.com/453143938_1060161539075365_8998373175870311540_n.jpg1723398454332"
//         fill
//         className='object-cover object-center'
//         />