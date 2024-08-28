'use client'
import { getCurrentUser, getUserByUserNameFromParams, isSubscribed, subscribe, unSubscribe } from '@/lib/actions/user.action'
import { getVideosByUserId } from '@/lib/actions/video.actions'
import { IUser } from '@/models/User'
import { IVideo } from '@/models/Video'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import UserVideos from '../../profile/(components)/user-videos'
import { Button } from '@/components/ui/button'

const ChannelPage = () => {
    const [user, setUser] = useState<IUser | null>(null)
    const [videos, setVideos] = useState<IVideo[]>([])
    const [currentUser, setCurrentUser] = useState<IUser | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [subscribed, setSubscribed] = useState<boolean | undefined>(false)

    

    const params = useParams()
    
    useEffect(() => {
      
        const fetchData = async () => {

            // GETS USER
            const userData = await getUserByUserNameFromParams(params.username.toString()) 
            setUser(userData)

            // GETS USERS VIDEOS
            const userVideos = await getVideosByUserId(userData)
            setVideos(userVideos)

            // GETS LOGGED USER
            const loggedUserData = await getCurrentUser()
            setCurrentUser(loggedUserData)

            // CHECK if logged user is subscribed
            const subs = async (curUser: IUser, us: IUser) => {
              if (us._id === undefined) return
              const userSet = new Set(curUser.subscribtions)
              if (userSet.has(us._id)) {
                return true
              } else {
                return false
              }
            }

            const isSubbed = await subs(loggedUserData, userData)
            setSubscribed(isSubbed)

        }

        fetchData()
    }, [params.username])

    if (user === null) return null
    if (currentUser === null) return null

    // SUBSCRIBES
    const onSubscribe = async () => {
      setLoading(true)
      const subscrbingResult = await subscribe(currentUser, user)
      console.log(subscrbingResult)
      setSubscribed(true)
      setLoading(false)
    }

    // UNSUBSCRIBES
    const onUnSubscribe = async () => {
      setLoading(true)
      const subscrbingResult = await unSubscribe(currentUser, user)

      setSubscribed(false)
      setLoading(false)
    }


  return (
    <div className='w-full h-full'> 
      <div className='bg-black aspect-[5/1] 2xl:w-[1050px] xl+1:w-[900px]  md+1:w-[750px]  md:w-[700px] w-[80%] mx-auto mt-16 mb-8 rounded-2xl flex justify-center items-center'>
        <h1 className='md:text-5xl text-xl text-white font-bold '>{user.banner === null ? "Your Banner" : user.banner}</h1>
      </div>
      <div>
        
      </div>
      <div className='items-center justify-between 2xl:w-[1050px] xl+1:w-[900px]  md+1:w-[750px]  md:w-[700px] w-[80%] mx-auto  rounded-2xl flex  gap-2'>
       <div className='flex gap-2 items-center'>
       <div className='border-[6px] border-black rounded-full md:h-[170px] sm:h-[100px] h-[70px] aspect-square relative'>
            <Image
            src={user.photo}
            fill
            alt={user?.clerkId}
            className='rounded-full shadow-xl object-cover   object-center'
            />
        </div>
        <div className='text-white flex flex-col gap-2 py-2 '>
            <h1 className='font-bold text-xl md:text-3xl shadow-xl p-1'> {user.username !== null && user.username.length > 20 ? `${user.username?.substring(0,20)}...` : user.username}</h1>
            <div className='flex gap-2 px-1'>
                <p className='text-sm md:text-md'>Subscribers: {user.subscribers?.length  || 0} </p>
                <p className='text-sm md:text-md'>Videos: {user.videos.length} </p>
            </div>
            <p className='hidden md:flex px-1 max-w-[400px] text-sm md:text-md'>Bio: {user.bio}</p>
        </div>
       </div>
        { subscribed ? (
          <Button onClick={onUnSubscribe}  disabled={loading} size="xl" variant="default">Subscribed</Button>

        ): (
          <Button onClick={onSubscribe} disabled={loading} size="xl" variant="secondary">Subscribe</Button>
        ) 
        }
      </div>

      <UserVideos 
      videos={videos}
      />
      
    </div>
  )
}

export default ChannelPage
