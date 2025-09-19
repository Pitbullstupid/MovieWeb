import React from 'react'
import { Input } from './ui/input';
import { Button } from './ui/button';
const Header = () => {
  return (
        <div className='flex pt-2 pb-2 items-center justify-between border-b border-gray-800 h-14 bg-gradient-to-r from-black to-gray-900'>
        <div className='flex items-center space-x-6 ml-6'>
            <h1 className='text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#db5840] to-[#b6b2b2]'>MovieWeb</h1>
            <Input type='text' placeholder='Tìm kiếm phim...' className='bg-[#1c1c1c] text-white border-0 focus:ring-0 '/>
        </div>
        <div >
            <nav>
                <ul className='flex space-x-10 font-medium'>
                    <li><a href='#' className='text-white hover:text-yellow-300'>Chủ đề</a></li>
                    <li><a href='#' className='text-white hover:text-yellow-300'>Thể loại</a>
                    </li>
                    <li><a href='#' className='text-white hover:text-yellow-300'>Phim lẻ</a></li>
                    <li><a href='#' className='text-white hover:text-yellow-300'>Phim bộ</a></li>
                    <li><a href='#' className='text-white hover:text-yellow-300'>Quốc gia</a></li>
                    <li><a href='#' className='text-white hover:text-yellow-300'>Diễn viên</a></li>
                    <li><a href='#' className='text-white hover:text-yellow-300'>Lịch chiếu</a></li>
                </ul>
            </nav>
        </div>
        <div className='mr-6'>
            <Button variant="secondary" className="px-6">Login</Button>
        </div>
    </div>
  )
}

export default Header;