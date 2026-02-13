import React, { useState } from 'react'

const Description = ({description}) => {
  const [isExpanded, setIsExpaned]= useState(false);
  return (
    <div className='w-[700px] bg-gray-200 rounded-2xl transition-all duration-300 ease-in-out'>
      <div className={`text-sm text-gray-800 whitespace-pre-wrap ${!isExpanded ? 'line-clamp-3' : 'h-auto'}`}>

      
        <p  className='p-4 m-2'>{description}
        </p>

      </div>
      <button
      className='m-2 p-4 font-bold text-sm hover:text-gray-600 transition-colors'
      onClick={()=> setIsExpaned(!isExpanded)}
      >
          
        Show {isExpanded === true ? "less" : "more"}
      </button>
    </div>
  )
}

export default Description