import { Button } from '@/components/ui/button'
import { IVideo } from '@/models/Video'
import {  X } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface ModalProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    edit: IVideo | null
}

const Modal = ({
    open, setOpen, edit
}: ModalProps) => {
  return (
    <div>
      {open && (
                    <div className='group'>
                    <div className='fixed bg-black inset-0 opacity-50'>
                    
                    </div>
                    <div className={`bg-black z-[100] border-2  aspect-video max-w-[500px] w-[80%] inset-0 fixed 
                        m-auto rounded-xl duration-300 opacity-0 scale-50   group-hover:scale-100 group-hover:opacity-100`}>
                        <button
                            className='absolute top-2 right-2 text-rose-900  hover:text-rose-500 transition-colors cursor-pointer  active:scale-110'
                            onClick={() => setOpen(false)}>
                            <X  
                            height={20}
                            width={20}
                            />
                        </button>
                        <div className='h-full w-full flex flex-col gap-5 items-center justify-center '>
                            <h1 className='text-white text-xl font-semibold text-center '>Would you like to go to video <br />&quot;{edit?.title}&quot; <br /> settings?</h1>
                            <div className='flex gap-5 '>
                                <Link  href={`/profile/videoSettings/${edit?._id}`}><Button  variant="edit">Yes</Button></Link>
                                <Button onClick={() => {
                                    setOpen(false)
                                }} variant="destructive">CANCEL</Button>
                            </div>
                        </div>
                    </div>
                </div>
                )}
    </div>
  )
}

export default Modal
