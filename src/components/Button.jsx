import React from 'react'

const Button = ({name}) => {
  return (
    <div>
        <button className='m-2 p-1 text-sm md:m-3 md:p-2 rounded-xl cursor-pointer bg-gray-200'>{name}</button>
    </div>
  )
}

export default Button;