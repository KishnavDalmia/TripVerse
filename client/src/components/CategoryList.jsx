import React from 'react'

const CategoryList = ({selectCat}) => {
  return (
    <div>
      <div className='flex justify-evenly bg-gray-100 py-1 rounded-md w-180'>
        <button className='focus:bg-white focus:shadow-md text-black px-12 py-2 rounded-md ' onClick={()=>selectCat('all')}>All</button>
        <button className='focus:bg-white focus:shadow-md text-black px-12 py-2 rounded-md ' onClick={()=>selectCat('past')}>Past</button>
        <button className='focus:bg-white focus:shadow-md text-black px-12 py-2 rounded-md ' onClick={()=>selectCat('future')}>Future</button>
        <button className='focus:bg-white focus:shadow-md text-black px-12 py-2 rounded-md ' onClick={()=>selectCat('live')}>Live</button>
      </div> 
    </div>
  )
}

export default CategoryList