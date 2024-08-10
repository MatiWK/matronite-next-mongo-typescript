import Footer from '@/app/(showcase)/(components)/footer'
import SideNav from '@/components/side-nav'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const CommunityLayout = ({ children }: Props) => {
    
  

  return (
    <div className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full min-h-screen flex '>
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
