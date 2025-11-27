import React from 'react'
import DataTable from '@/components/DataTable'
import { Button } from '@/components/ui/button'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPrint,  faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import { movieColumns } from '@/lib/data'

const Movies = ({ movieList }) => {
  return (
    <div className='ml-16 flex flex-col items-center'>
      <div className='mt-4 w-[96%]'>
        {/* Title */}
        <div>
          <p className='text-white font-bold text-3xl'>Quản lý phim</p>
        </div>

        {/* Search + Buttons */}
        <div className='mt-10 flex justify-end'>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="default" className="border-2 border-[#2F2F2F] bg-[#181A1F] text-white hover:opacity-90">
              <FontAwesomeIcon icon={faPrint} /> Tạo bản in
            </Button>
            <Button variant="outline" className="hover:opacity-90">
              <FontAwesomeIcon icon={faSquarePlus} /> Thêm mới
            </Button>
          </div>
        </div>

        {/* DataTable */}
        <div className='mt-4'>
          <DataTable data={movieList} columns={movieColumns} searchKey="title"/>
        </div>
      </div>
    </div>
  )
}

export default Movies
