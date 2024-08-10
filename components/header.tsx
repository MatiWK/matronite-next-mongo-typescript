'use client'
import { getCurrentUser } from '@/lib/actions/user.action'
import { IUser } from '@/models/User'
import { UserButton, SignedIn } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'

const Header = () => {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null)

  useEffect(() => {
    const getUser = async () => {
      const data = await getCurrentUser()
      setCurrentUser(data)
    }
    getUser()
  }, [])

  return (
    <div className='w-full bg-black shadow-xl'>
      <SignedIn >
          <div className='p-5 max-w-[1200px] w-full mx-auto flex justify-around'>
            <div className='text-white font-semibold'>
              Hi, {currentUser?.username}
            </div>
            <UserButton />
                
          </div>
      </SignedIn>
      </div>
  )
}

export default Header
