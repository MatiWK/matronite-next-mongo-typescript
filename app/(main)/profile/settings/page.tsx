'use client'
import { Button } from '@/components/ui/button'
import { uploadFile } from '@/lib/actions/fileUpload'
import { getCurrentUser, updateUser } from '@/lib/actions/user.action'
import { IUser } from '@/models/User'
import { useAuth } from '@clerk/nextjs'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const SettingsPage = () => {
    const [username, setUsername] = useState<string | null>('')
    const [profilePic, setProfilePic] = useState<string>('')
    const [currentUser, setCurrentUser] = useState<IUser | null>(null)
    const [editing, setEditing] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [bio, setBio] = useState<string>('')
    const [banner, setBanner] = useState<string | null>('')


    const router = useRouter()
    const {userId} = useAuth()

    useEffect(() => {
        const getUser = async () => {
            const userData: IUser = await getCurrentUser()
            setCurrentUser(userData)
            setUsername(userData.username)
            setProfilePic(userData.photo)
            setBio(userData.bio)
            setBanner(userData.banner)
            
        }

        getUser()
    }, [])

    if (!userId) {
        router.push("/community")
        return
    }

    if (!currentUser) return

    const save = async () => {
        const updating = {...currentUser, photo: profilePic, username, bio, banner}
        const updatedUser: IUser = await updateUser(updating)
        toast.success("Profile Updated Succesfully!")
        location.reload();
    }

    const uploadImageToAWSS3 = async (e: React.ChangeEvent<HTMLInputElement>, type: "profilePIC" | "banner") => {
        setLoading(true)
        if (e.target.files === null) return;
        console.log(type)
        const file = e.target.files[0];
        
        const arrayBuffer = await file.arrayBuffer();
        const base64String = Buffer.from(arrayBuffer).toString('base64');  
    
        const response = await uploadFile(base64String, file.name);  

        if (type === "profilePIC" ) {
            setProfilePic(`https://matronite-final-bucket-v4.s3.eu-north-1.amazonaws.com/${response.fileName}${response.dateFileId}`)
        
        } else {
            setBanner(`https://matronite-final-bucket-v4.s3.eu-north-1.amazonaws.com/${response.fileName}${response.dateFileId}`)
        }

        if (response) {
            if (type === "profilePIC") {
                toast.success("Profile Pic has been uploaded successfully")
            } else {
                toast.success("Banner has been uploaded successfully")
            }
        } else {
            if (type === "profilePIC") {
                toast.error("Profile Pic upload has failed")
            } else {
                toast.error("Banner upload has failed")
            }
        }

        setLoading(false)
    };


  return (
    <div className=' text-black  my-16  rounded-lg lg:w-1/2  w-full p-5'>

        <div className='flex flex-col gap-5 bg-white rounded-xl p-8 w-full  lg:text-xl'>
        <div className='flex gap-8 font-semibold items-center'>
            <label className='  w-1/4 font-bold' >Username:</label>
            {!editing ? <h1 className=' overflow-hidden  font-bold'>{currentUser.username}</h1> : (
                <input type="text"
                disabled={loading}
                value={username || ''}
                className='rounded-md py-1 px-1 focus:outline-none border-2 w-3/5 focus:bg-slate-500 focus:border-slate-600 border-transparent bg-slate-300 text-white transition-all'
                onChange={(e) => setUsername(() => e.target.value)}
                />
            )}
            
        </div>
        <div className='flex gap-8 font-semibold items-center '>
            <label className='  w-1/4 font-bold' >Profile Pic:</label>
            {currentUser._id && (
                !editing ? 
                (<div className='relative h-[120px] w-[120px] rounded-full border-[4px] bg-black border-black'>
                    <Image 
                src={currentUser.photo}
                fill
                alt={currentUser._id.toString()}
                className='rounded-full object-cover  object-center'
                />
                </div>
                ) : (
                <label className='bg-slate-300 hover:bg-slate-500 text-black  w-[200px] shadow-xl cursor-pointer 
                hover:-translate-y-1 transition-all duration-500 aspect-square rounded-xl'>
                    <div className='flex justify-center items-center h-full
                    font-bold text-xl '>
                        Upload
                    </div>
                    <input 
                    disabled={loading}
                    onChange={(e) => uploadImageToAWSS3(e, 'profilePIC')}
                    accept="image/png, image/jpeg" type="file" className='hidden'/>
                </label>)
            )}
        </div>
        <div className='flex gap-8 font-semibold items-center'>
            <label className='w-1/4 font-bold'>Banner:</label>
            {currentUser._id && (
            
                !editing ? 
                (
                    currentUser.banner !== null ? (
                    <div className='relative w-full aspect-[5/1] border-[4px] bg-black border-black rounded-xl '>
                    <Image 
                src={currentUser.banner}
                fill
                alt={currentUser._id.toString()}
                className='rounded-xl object-cover w-full h-full  object-center '
                />
                </div>) : (
                    <div className='relative w-full aspect-[5/1] rounded-xl border-[4px] bg-black border-black'>
                        <h1 className='flex items-center justify-center w-full h-full text-white'>Your Banner</h1>
                    </div>
                )
                ) : (
                    <label className='bg-slate-300 hover:bg-slate-500 text-black  w-[200px] shadow-xl cursor-pointer 
                    hover:-translate-y-1 transition-all duration-500 aspect-square rounded-xl'>
                        <div className='flex justify-center items-center h-full
                        font-bold text-xl '>
                            Upload
                        </div>
                        <input 
                        disabled={loading}
                        onChange={(e) => uploadImageToAWSS3(e, 'banner')}
                        accept="image/png, image/jpeg" type="file" className='hidden'/>
                    </label>

                ))
            }
        </div>
        <div className='flex gap-[2rem] font-semibold items-center'>
            <label className='  w-1/4 font-bold' >Email:</label>
            <h1 className=' overflow-hidden font-bold'>{currentUser.email}</h1>
            
        </div>
        <div className='flex gap-[2rem] font-semibold items-center'>
            <label className='  w-1/4 font-bold' >Subscribers:</label>
            <h1 className='  font-bold'>{currentUser.subscribers?.length || 0}</h1>
            
        </div>
        <div className='flex gap-[2rem] font-semibold items-center'>
            <label className='  w-1/4 font-bold' >TOTAL VIEWS:</label>
            <h1 className='  font-bold'>TODO</h1>
            
        </div>
        <div className='flex gap-[2rem] font-semibold items-center'>
            <label className='  w-1/4 font-bold' >TOTAL Videos:</label>
            <h1 className='  font-bold'>{currentUser.videos.length}</h1>
            
        </div>
        <div className='flex gap-8 font-semibold items-center w-full h-full'>
            <label className='  w-1/4 font-bold' >BIO:</label>
            <div className='h-full '>
                { !editing ? (
                    <h1 className='text-lg  font-semibold flex flex-wrap'>{currentUser.bio}</h1>
                ): (
                    
                    <textarea
                      value={bio || ''}
                        className='rounded-md w-full py-1 px-1 focus:outline-none border-2 focus:bg-slate-500 focus:border-slate-600 border-transparent bg-slate-300 text-white transition-all'
                        rows={10}
                        cols={40}
                        onChange={(e) => setBio(() => e.target.value)}

                    >
                        Enter bio here...</textarea>
                )}
            </div>
            
        </div>
        </div>
        {!editing ? <Button onClick={() => setEditing(true)} className='my-3 text-xl' size="xl">Edit</Button> : (
            <div className='flex gap-2'>
                <Button disabled={loading} onClick={save} className='my-3 text-xl' size="xl">Save</Button>
                <Button variant="destructive" size="xl" className='my-3 text-xl' onClick={() => setEditing(false)}>Cancel</Button>
            </div>
        )}
        
      {/* <form>
        <div className='flex flex-col gap-5 '>

        
        <div className='flex gap-5 font-semibold items-center'>
            <label className=' text-3xl w-1/4 font-bold' >Username:</label>
            <input type="text"
            value={username}
            className='rounded-md py-1 px-1 focus:outline-none border-2 focus:border-slate-600 border-transparent text-black'
            onChange={(e) => setUsername(() => e.target.value)}
            />
        </div>
        <div className='flex gap-5 font-semibold items-center'>
        <label className='text-3xl font-bold rounded-xl w-1/4 ' htmlFor="">Photo:</label>

        <label className='bg-white hover:bg-slate-300 text-black  w-[200px] shadow-xl cursor-pointer 
            hover:-translate-y-1 transition-all duration-500 aspect-square rounded-xl'>
                <div className='flex justify-center items-center h-full
                font-bold text-xl '>
                    Upload
                </div>
                <input 
                
                
                accept="image/png, image/jpeg" type="file" className='hidden'/>
            </label>
        </div>
        </div>
      </form> */}
    </div>
  )
}

export default SettingsPage
