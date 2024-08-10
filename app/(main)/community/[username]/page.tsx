'use client'
import { getUserByUserName } from '@/lib/actions/user.action';
import { IUser } from '@/models/User';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const FoundUsers = () => {
    const [foundUsers, setFoundUsers] = useState<IUser[] | null>(null)
    const params = useParams()

    useEffect(() => {
        const search = async () => {
            const data: IUser[] = await getUserByUserName(params.username.toString())
            setFoundUsers(data)
            console.log(data)
        }


        search()
    }, [params.username])

    
  return (
    <div className='p-16 flex flex-col gap-4'>
        {foundUsers?.map((user) => (

        <div key={user._id.toString()} className='bg-black p-4 flex gap-4 items-center justify-between  h-[20vh] shadow-xl w-[800px] rounded-xl  hover:-translate-y-1  transition-transform '>
                <div className='flex items-end gap-2 bg-slate-700 p-4 rounded-xl shadow-xl min-w-[400px]'>
                    <Image
                    src={user.photo}
                    height={100}
                    width={100}
                    alt={user._id.toString()}
                    className='rounded-full shadow-xl '
                    />
                    <div className='text-white  font-semibold text-xl '>
                    <div className='flex flex-col '>
                    <h1>Subscribers: TODO</h1>

                    {user.username !== null && <h1>{user.username.length > 20 ? `${user.username?.substring(0,20)}...` : user.username}</h1>}
                    </div>
                </div>
                </div>
                
                <div className=''>
                <h1 className='text-center font-bold text-white '>Most Recent Video</h1>
                <div className='bg-white h-[16vh] w-[28vh] flex shadow-xl '>
                        <h1 className='text-black  text-center m-auto '>Thumbnail</h1>
                    </div>
                    
                </div>
                
        </div>

        ))}
      
    </div>
  )
}

export default FoundUsers
