import { Button } from '@/components/ui/button'
import { IVideo } from '@/models/Video';
import { Edit, Trash } from 'lucide-react'
import React from 'react'

interface ActionButtonsProps {
    editing: boolean;
    setEditing: React.Dispatch<React.SetStateAction<boolean>>;
    submit: () => void;
    setTitle: React.Dispatch<React.SetStateAction<string | null>>;
    video: IVideo;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ActionButtons = ({
    editing,
    setEditing,
    submit,
    setTitle,
    video,
    setOpen
}: ActionButtonsProps) => {
  return (
    <div className='flex gap-5'>
                <div className='flex gap-2 items-center'>
                        {!editing ? (
                            <Button 
                            onClick={() => {
                                setEditing(true)
                            }}
                            variant="edit" size="xl" className='flex gap-1 items-center border-2 border-b-4 border-violet-700 active:border-b-2'>
                                    <Edit
                                    height={20}
                                    width={20}
                                    />
                                    EDIT
                            </Button>
                        ) : (
                            <Button 
                            onClick={() => {
                                submit()

                            }}
                            variant="edit" size="xl" className='flex gap-1 items-center border-2 border-b-4 border-violet-700 active:border-b-2'>
                                    DONE
                            </Button>
                        )}
                </div>
                <div className='flex gap-2 items-center'>
                    {!editing ? (
                        <Button 
                        onClick={() => {
                            setOpen(true)
                        }}
                        variant="destructive" size="xl" className='flex gap-1 items-center border-2 border-b-4 border-destructive active:border-b-2'>
                        <Trash 
                        height={20}
                        width={20}
                        />
                        DELETE
                    </Button>
                    ) : (
                        <Button 
                        onClick={() => {
                            setTitle(video.title)
                            setEditing(false)
                        }}
                        variant="destructive" size="xl" className='flex gap-1 items-center border-2 border-b-4 border-destructive active:border-b-2'>
                        <Trash 
                        height={20}
                        width={20}
                        />
                        Cancel
                    </Button>
                    )}

                </div>
            </div>
  )
}

export default ActionButtons
