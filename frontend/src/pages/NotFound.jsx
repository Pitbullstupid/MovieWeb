import React from 'react'

const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen text-center bg-[#3b3d47]'>
      <img src="/404_NotFound.png" alt="Not Found"  className='max-w-full mb-6 w-96'/>
      <p className='text-xl font-semibold text-[#FFD875]'>404 - Not Found</p>
      <a href="/" className='inline-block px-6 py-3 mt-6 text-sm font-medium text-[#FFD875] rounded-2xl shadow-md bg-[#272A39] hover:scale-110 hover:opacity-85 transition-transform duration-500'>Trở về trang chủ</a>
      </div>
  )
}

export default NotFound