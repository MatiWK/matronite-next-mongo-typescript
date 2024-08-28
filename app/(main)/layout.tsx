import Footer from '@/app/(showcase)/(components)/footer'
import Header from '@/components/header'
import SideNav from '@/components/side-nav'
import { useUser } from '@clerk/nextjs'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const CommunityLayout = ({ children }: Props) => {
  

  return (
    <div className='bg-gradient-to-r from-[#0011ff]  to-[#ff8000] w-full min-h-screen flex '>
      <SideNav />
      <div className='flex-1 flex flex-col'>
      <div className='flex  justify-center flex-1'>
        {children}
      </div>
      <Footer />

      </div>
      
    </div>
  )
}

export default CommunityLayout;
