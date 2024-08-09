import { UserButton, SignedIn } from '@clerk/nextjs'
import React from 'react'

const Header = () => {
  return (
    <div className='w-full bg-black shadow-xl'>
      <SignedIn >
          <div className='p-5 max-w-[1200px] w-full mx-auto  flex justify-end'>
            <UserButton />
                
          </div>
      </SignedIn>
      </div>
  )
}

export default Header
