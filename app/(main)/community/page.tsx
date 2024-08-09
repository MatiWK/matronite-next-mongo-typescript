'use client'
import { Search } from 'lucide-react'
import React, { useState } from 'react'

const CommunityPage = () => {
    const [creator, setCreator] = useState('')
    

  return (
    
    <div className=''>
        <h1 className='md:text-5xl text-3xl  my-16 font-bold text-center'>Find Your Desired Creator</h1>
        <div className='flex justify-center  items-center '>
            <input 
            placeholder='Enter E-mail or Username'
            onChange={(e) => setCreator(e.target.value)}
            className='focus:outline-none border-2 focus:border-black border-transparent  rounded-l-xl w-full bg-amber-200 p-2  font-bold ' 
            type="text" 
            value={creator} 
            />
            <button className='py-2 px-4   rounded-r-xl bg-amber-100 text-black border-2 border-amber-100'>
            <Search />
            </button>

        </div>

    </div>
  )
}

export default CommunityPage
