import React from 'react'

const Footer = () => {
    const date = new Date()
    const year = date.getFullYear()
  return (
    <div className='font-semibold  w-full flex  justify-center  py-5'>
        <div className='w-full py-5 text-center'>
            © Copyrighted Matronite {year}
        </div>
      </div>
  )
}

export default Footer
