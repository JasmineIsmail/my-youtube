import React from 'react'
import Sidebar from './Sidebar';
import Body from './Body';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const MainContainer = () => {
  return (
    <div>
      <Header/>
    
    <div className='flex'>
         
        <Sidebar/>
        <Outlet/>
    </div>
    </div>
  )
}

export default MainContainer;