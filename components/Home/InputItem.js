import Image from 'next/image'
import React from 'react'

function InputItem() {
  return (
    <div className='bg-slate-200 p-3  rounded-lg mt-3'>
        <Image src='/source.png' width={15} height={15}/>
        <input type='text' placeholder='Pickup Location'/>
    </div>
  )
}

export default InputItem