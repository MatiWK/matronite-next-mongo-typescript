'use client'
import { getVideosByTitle } from '@/lib/actions/video.actions'
import { IVideo } from '@/models/Video'
import { useParams, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const VideoPage = () => {
    const [video, setVideo] = useState<IVideo | null>(null)
    const params = useParams()

    useEffect(() => {
        const getVideo = async () => {
            var replaced = params.title.toString().replace(/%20/g, " ");
            const data: IVideo = await getVideosByTitle(replaced)
            setVideo(data)
            console.log(data)            
        }

        getVideo()
    }, [params.title])

  return (
    <div>
      <div className='text-center text-5xl py-16 font-bold'>
        {video?.title}
      </div>
      <div>
        {video && (
            <video controls >
            <source src={video.url} type="video/mp4" />
        </video>
        )}
        
      </div>

    </div>
  )
}

export default VideoPage
