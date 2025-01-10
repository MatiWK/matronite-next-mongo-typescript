'use client'
import { getCurrentUser } from '@/lib/actions/user.action'
import { deleteVideoById, getVideoById, updateVideo } from '@/lib/actions/video.actions'
import { IUser } from '@/models/User'
import { IVideo } from '@/models/Video'
import { Edit, PlayCircle, Trash, X } from 'lucide-react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import BigTitle from './(components)/bigTitle'
import VideoAndThumbnail from './(components)/video-and-thumbnail'
import VideoDetails from './(components)/video-details'
import { Button } from '@/components/ui/button'
import ActionButtons from './(components)/action-buttons'
import toast from 'react-hot-toast'

const VideoSettings = () => {
    const [video, setVideo] = useState<IVideo | null>(null)
    const [currentUser, setCurrentUser] = useState<IUser | null>(null)
    const [editing, setEditing] = useState<boolean>(false)
    const [title, setTitle] = useState<string | null>(null)
    const [photo, setPhoto] = useState<string | null>(null)
    const [active, setActive] = useState<string | null>(null);
    const [newThumbnail, setNewThumbnail] = useState<string | null>(null)
    const [newPhoto, setNewPhoto] = useState<string | null>(null)
    const [refresh, setRefresh] = useState<number>(1)
    const [open, setOpen] = useState<boolean>(false)

    const params = useParams()
    const router = useRouter()

    useEffect(() => {
        const fetchData = async () => {
            // Get Logged user
            const userData: IUser = await getCurrentUser()
            setCurrentUser(userData)
            
            // Get video from params ID
            const videoData: IVideo = await getVideoById(params.id.toString())
            setVideo(videoData)
            setTitle(videoData.title)
            setActive(videoData.thumbnailUrl)
            setNewPhoto(videoData.thumbnailUrl)
        }

        fetchData()
    }, [params.id, refresh])

    
    if (!currentUser) return null
    if (!video) return null

    // MAKE SURE ITS PROPER USER
    if (currentUser?._id?.toString() !== video?.user.toString()) {
        toast.error("UNATHORIZED USER! YOU DO NOT HAVE ACCESS TO THIS PAGE!")
        router.push("/profile")
        return null
    }

    const submit: () => void = async () => {
        if (active && title) {
            const newVideo = {...video, title: title, thumbnailUrl: active}
            
            try {
                const response = await updateVideo(newVideo)
                console.log(response)
                setVideo(response)
                toast.success("Video has been updated")
                setEditing(false)
            } catch (error) {
                console.log(error)
                toast.error("An error accured during video upload")

            } finally {
                setEditing(false)
                setRefresh((prev) => prev + 1)
            }
            

                // toast.success("Video has been updated")
                // setEditing(false)
                // toast.error("An error accured during video upload")
            }
            
        }

        const onDelete = async () => {
            if (!video._id) return 

            const response = await deleteVideoById(video)

            if (response) {
                toast.success("Video deleted successfully")
                setOpen(false)
                router.push("/profile")
            } else {
                toast.error("Couldn't delete the Video")
            }
        }
        
        

  return (
    <div>
        <div className='bg-black m-10 rounded-xl  w-[80%] '>
            <div className='w-full h-full p-5 flex flex-col gap-10 '>
                <BigTitle 
                title={title === null ? video.title : title }
                editing={editing}
                setTitle={setTitle}
                />
                <VideoAndThumbnail 
                editing={editing}
                video={video}
                photo={photo}
                setPhoto={setPhoto}
                active={active}
                setActive={setActive}
                />
                <VideoDetails
                video={video}
                />

                <ActionButtons 
                editing={editing}
                setEditing={setEditing}
                submit={submit}
                setTitle={setTitle}
                video={video}
                setOpen={setOpen}
                />
            </div>
        </div>
        {open && (
                    <div className='group'>
                    <div className='fixed bg-black inset-0 opacity-50'>
                    
                    </div>
                    <div className={`bg-black z-[100] border-2  aspect-video max-w-[500px] w-[80%] inset-0 fixed 
                        m-auto rounded-xl duration-300 opacity-0 scale-50   group-hover:scale-100 group-hover:opacity-100`}>
                        <button
                            className='absolute top-2 right-2 text-rose-900  hover:text-rose-500 transition-colors cursor-pointer  active:scale-110'
                            onClick={() => setOpen(false)}>
                            <X  
                            height={20}
                            width={20}
                            />
                        </button>
                        <div className='h-full w-full flex flex-col gap-5 items-center justify-center '>
                            <h1 className='text-white text-xl font-semibold text-center '>Are you sure you want to delete this video</h1>
                            <div className='flex gap-5 '>
                                <Button 
                                onClick={() => onDelete()}
                                variant="destructive">DELETE</Button>
                                <Button onClick={() => {
                                    setOpen(false)
                                }} variant="edit">CANCEL</Button>
                            </div>
                        </div>
                    </div>
                </div>
                )}
    </div>
  )
}

export default VideoSettings
