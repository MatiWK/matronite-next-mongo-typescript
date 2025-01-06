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
    const params = useParams()

    useEffect(() => {
        const search = async () => {
            // fix searching with spaces
            const userName = params.username.toString().replace(/%20/g, "");
            const userData: IUser[] = await getUserByUserName(userName)
            setFoundUsers(userData)

            
            
        }

        console.log(params.username)
        search()
    }, [params.username])

    

    
  return (
    <div className="py-16 flex flex-col lg:gap-4 gap-2">
        {foundUsers?.map((user) => 
        
                <div key={user.clerkId} className="bg-black p-4   shadow-xl lg:w-[800px] rounded-xl  hover:-translate-y-1  transition-transform ">
                <Link href={`/channel/${user.username}`}>
                <div className="flex items-center gap-2  bg-slate-700 p-4 rounded-xl shadow-xl min-w-[400px] border-2 border-transparent hover:border-white duration-500">
                    <Image
                    src={user.photo}
                    height={100}
                    width={100}
                    alt={user.username || "User Photo"}
                    className="rounded-full shadow-xl object-cover object-center aspect-square"
                    />
                    <div className="text-white  font-semibold text-xl ">
                        <div className="flex flex-col ">
                        <h1>Subscribers: {user.subscribers?.length}</h1>

                        {user.username !== null && <h1>{user.username.length > 20 ? `${user.username?.substring(0,20)}...` : user.username}</h1>}
                        </div>
                    </div>
                </div>
                </Link>
                
            </div>
        )}
    </div>
  )
}

export default FoundUsers
