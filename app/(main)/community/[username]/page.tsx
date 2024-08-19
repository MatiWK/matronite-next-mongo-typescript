'use client'
import { getUserByUserName } from '@/lib/actions/user.action';
import { getVideosById, getVideosByUserId } from '@/lib/actions/video.actions';
import { IUser } from '@/models/User';
import { IVideo } from '@/models/Video';
import { PlayCircleIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'



const FoundUsers = () => {
    const [foundUsers, setFoundUsers] = useState<IUser[] | null>(null)
    const [usersWithVideos , setUsersWithVideos] = useState<any[]>()
    const params = useParams()

    useEffect(() => {
        const search = async () => {
            // fix searching with spaces
            const userName = params.username.toString().replace(/%20/g, "");
            const userData: IUser[] = await getUserByUserName(userName)
            setFoundUsers(userData)

            const userAndVideos = await getVideosById(userData)

            setUsersWithVideos(userAndVideos)




            
            
        }

        console.log(params.username)
        search()
    }, [params.username])

    

    
  return (
    <div className="p-16 flex flex-col gap-4">
        {usersWithVideos?.map((userAndVid) => 
        
                <div key={userAndVid.user.clerkId} className="bg-black p-4 flex gap-4 items-center justify-between   shadow-xl w-[800px] rounded-xl  hover:-translate-y-1  transition-transform ">
                <Link href={`/channel/${userAndVid.user.username}`}>
                <div className="flex items-center gap-2  bg-slate-700 p-4 rounded-xl shadow-xl min-w-[400px]">
                    <Image
                    src={userAndVid.user.photo}
                    height={100}
                    width={100}
                    alt={userAndVid.user.clerkId}
                    className="rounded-full shadow-xl object-cover object-center aspect-square"
                    />
                    <div className="text-white  font-semibold text-xl ">
                    <div className="flex flex-col ">
                    <h1>Subscribers: TODO</h1>

                    {userAndVid.user.username !== null && <h1>{userAndVid.user.username.length > 20 ? `${userAndVid.user.username?.substring(0,20)}...` : userAndVid.user.username}</h1>}
                    </div>
                </div>
                </div>
                </Link>
                
                <div>
                <h1 className="text-center font-bold text-white">Most Recent Video</h1>
                <Link href={`/video/${userAndVid.video.title}`} >
                <div className="bg-white h-[150px] aspect-video flex shadow-xl relative rounded-xl border-2 border-white">
                        <h1 className="text-black  text-center m-auto "></h1>
                        <Image 
                        src={userAndVid.video.thumbnailUrl}
                        fill
                        alt={userAndVid.video._id}
                        className='rounded-xl'
                        />
                        <PlayCircleIcon 
                        className='text-white absolute top-1/2 left-1/2 -translate-y-[50%] -translate-x-[50%]'
                        size={40}
                        />
                        
                    </div>
                    </Link>
                </div>
            </div>
        )}
    </div>
  )
}

export default FoundUsers
