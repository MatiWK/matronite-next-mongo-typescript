'use client'
import { getCurrentUser } from '@/lib/actions/user.action'
import { IUser } from '@/models/User'
import { SignedIn, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const SideNav = () => {

    const [currentUser, setCurrentUser] = useState<IUser | null>(null)

  useEffect(() => {
    const getUser = async () => {
      const data = await getCurrentUser()
      setCurrentUser(data)
    }
    getUser()
  }, [])
  return (
    <div className='min-h-screen w-[15%] bg-black shadow-xl hidden  lg+1:flex flex-col'>
        <div>
            <h1 className='text-slate-300 font-bold text-3xl p-5 pb-8 '>Matronite</h1>
        </div>
        <SignedIn >
          <div className=' w-full mx-auto flex items-center gap-2 p-5 pt-8 ' >
            
            <UserButton />
            <div className='text-slate-300 text-sm font-semibold cursor-default hidden xl:flex'>
              <h1>{currentUser?.username?.substring(0,15)}...</h1>
            </div>
          </div>
      </SignedIn>

      <div className='p-5 flex flex-col  flex-1'>
        <h1 className='text-slate-300 text-xl font-bold pb-3'>GENERAL</h1>
        <ul className='text-white  font-semibold  flex-col flex-1 space-y-3 '>
            <li><Link href="/subscriptions">Subscriptions</Link></li>
            <li><Link href="/profile">Profile</Link></li>
            <li><Link href="/history">History</Link></li>
            <li><Link href="featured">Featured</Link></li>
            <li><Link href="/popular">Popular</Link></li>
            <li><Link href="/messages">Messages</Link></li>
        </ul>
        <div>
        chuj
      </div>
      </div>
      
      </div>
  )
}

export default SideNav
