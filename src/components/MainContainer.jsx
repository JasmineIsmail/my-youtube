import React from 'react'
import Sidebar from './Sidebar';
import Body from './Body';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { closeMenu,openMenu } from '../utils/appSlice';

const MainContainer = () => {
  const dispatch = useDispatch();
   useEffect(() => {
    if (window.innerWidth < 768) {
      dispatch(closeMenu()); // mobile: sidebar hidden by default
    } else {
      dispatch(openMenu()); // desktop: sidebar visible by default
    }
  }, [dispatch]);
  return (
    <div>
      <Header/>
      <div className='flex pt-14'>
        <Sidebar/>
          <div className="flex-1">
            <Outlet/>
          </div>
      </div>
    </div>
  )
}

export default MainContainer;