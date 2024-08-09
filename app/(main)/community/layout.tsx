import Footer from '@/app/(showcase)/(components)/footer'
import Header from '@/components/header'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const CommunityLayout = ({
    children
}: Props) => {
  return (
    <div className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full min-h-screen flex flex-col'>
        <Header />
      <div className=' flex flex-1 justify-center '>
      {children}

      </div>
      <Footer />
    </div>
  )
}

export default CommunityLayout
