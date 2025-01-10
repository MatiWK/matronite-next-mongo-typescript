import { IVideo } from '@/models/Video'
import React from 'react'

interface VideoDetailsProps {
    video: IVideo
}

const VideoDetails = ({
    video
}: VideoDetailsProps) => {
  return (
    <div>
      <div className='bg-violet-700 w-full h-full flex flex-col  rounded-xl p-10 text-2xl font-semibold text-white'>
                <div className='grid grid-cols-2 bg-violet-500 p-5 rounded-t-xl'>
                    <h1>TOTAL VIEWS:</h1>
                    <h1>{video.views}</h1>
                </div>
                <div className='grid grid-cols-2 border-2 border-violet-500 p-5 rounded-b-xl'>
                    <h1>Upload date:</h1>
                    <h1>{video.createdOn ? video.createdOn.toString().substring(0,10)  : "NO ONE KNOWS"}</h1>
                </div>
            </div>
    </div>
  )
}

export default VideoDetails
