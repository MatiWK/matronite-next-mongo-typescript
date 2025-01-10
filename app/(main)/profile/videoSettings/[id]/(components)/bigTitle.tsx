import React from 'react'

interface titleProps {
    title: string;
    editing: boolean;
    setTitle: React.Dispatch<React.SetStateAction<string | null>>
}

const BigTitle = ({title, editing, setTitle}: titleProps) => {
  return (
    <div className='text-white font-semibold text-center md:text-2xl lg:text-3xl py-5 rounded-xl bg-violet-700 p-2'>
        {!editing ? (
          <h1>{title}</h1>
        ) : (
          <div className='flex gap-2 items-center'>
          
          <label htmlFor="">Title:</label>
            <input 
          value={title}
          className='bg-violet-500 px-5 py-2 rounded-lg w-full'
          onChange={(e) => setTitle(e.target.value)}
          />
          </div>
        )}
    </div>
    
  )
}

export default BigTitle
