import React from 'react'
import InputItem from './InputItem'

function SearchSection() {
  return (
    <div className='p-2 md:pd-5 
    border-[2px] rounded-xl'>
        <p className='text-[20px] font-bold'>
            Get a ride
            <InputItem/>
            <InputItem/>
        </p>
    </div>
  )
}

export default SearchSection