import { Button } from '@/components/ui/button'
import React from 'react'
import Footer from './(components)/footer'
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/nextjs'
import {Loader} from "lucide-react"
import Link from 'next/link'
import Header from '@/components/header'
const ShowcasePage =  () => {
  
  
  return (
    <div className='bg-gradient-to-r relative from-indigo-500 via-purple-500 to-pink-500 w-full min-h-screen flex flex-col'>
      <Header />
      

      <div className='flex flex-1 items-center justify-center h-[70vh]'>
        <div className=''>
        <div className='my-5'>
          <h1 className='text-2xl md:text-3xl lg:text-5xl font-bold '>Welcome to</h1>
          <h1 className='text-7xl md:text-8xl lg:text-9xl font-bold '>Matronite</h1>
        </div>
            <div className='flex gap-2 justify-end'>

            <ClerkLoading>
              <Loader className='h-5 w-5 animate-spin'/>
            </ClerkLoading>

            <ClerkLoaded>
              <SignedOut>
                <SignInButton
                mode='modal'
                forceRedirectUrl="/community"
                signUpForceRedirectUrl="/community"
                >
                  <Button>Sign In</Button>
                </SignInButton>
                <SignUpButton
                mode='modal'
                forceRedirectUrl="/community"
                >
                  <Button variant="secondary">Sign Up</Button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <Button>
                  <Link href="/community">
                    Go To Community
                  </Link>
                </Button>
              </SignedIn>
            </ClerkLoaded>
            </div>
        </div>
        
        
        
        

      </div>
      <Footer />
      
    </div>
    
  )
}

export default ShowcasePage
