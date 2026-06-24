import React from 'react';
import Button from './Button';

const buttons=["All","Popular","Music","Games","Movies","Live"];
const ButtonList = () => {
  return (
    <div className='flex font-semibold'>
      {buttons.map((button)=> 
        <Button name= {button} key= {button}/>
      )}
    </div>
  )
}

export default ButtonList;