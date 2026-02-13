import React from 'react'

const Button = ({name}) => {
  return (
    <div>
        <button className='m-3 p-2 rounded-xl cursor-pointer bg-gray-200'>{name}</button>
    </div>
  )
}

export default Button;