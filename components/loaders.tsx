import React, { CSSProperties, useState } from 'react'
import TypingText from './typingText';
import ClipLoader from 'react-spinners/ClipLoader';

const override: CSSProperties = {
    display: "block",
    borderColor: "white",
  };

  interface loadersTypeProps {
    loading: boolean
    loadingMessage: "Video" | "Thumbnail"
  }

const Loaders = ({
    loading,
    loadingMessage
}: loadersTypeProps) => {
    const [color, setColor] = useState("#000000");
    
  return (
    <> {loading && (
        <>
        <div className='fixed inset-0 bg-black opacity-50 '/>

        <div className='absolute top-1/2  -translate-y-[50%] left-1/2 -translate-x-[50%] flex flex-col items-center justify-center gap-5 z-50 '>
        <ClipLoader
            color={color}
            loading={loading}
            cssOverride={override}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
        <div className='flex gap-1 relative'>
            <h1 className='text-2xl text-white'>{loadingMessage} is uploading</h1>
            <div className='absolute  right-0 -translate-x-[-110%]' >
                <TypingText text=". . ." />
            </div>
        </div>


        </div>
        </>
    )}
        
        </>
  )
}

export default Loaders
