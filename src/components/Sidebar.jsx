import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { closeMenu } from '../utils/appSlice';

const SidebarContent =()=>{
  return(
    <>
    <ul >
        <li className='font-bold pt-2 hover:shadow hover:cursor-pointer'> Home</li>
        <li>Shorts</li>
        <li> Music</li>
        <li > Games</li>
      </ul>

      <h1 className='font-bold pt-2 hover:shadow hover:cursor-pointer'> Subscriptions</h1>
      <ul>
        <li> Channel 1</li>
        <li> Channel 2</li>
        <li> Channel 3</li>
        <li> Channel 4</li>
      </ul>

       <h1 className='font-bold pt-2 hover:shadow hover:cursor-pointer'>You</h1>
      <ul>
        <li> History</li>
        <li> Playlist</li>
        <li> Watch Later</li>
        <li> Your videos</li>
      </ul>
    </>
  )
}

const Sidebar = () => {

  const isMenuOpen = useSelector((store)=>store.app.isMenuOpen);
  const dispatch = useDispatch();
  return (
    <>
    {/*mobile overlay */}
    {isMenuOpen && (
      <div className='fixed inset-0 bg-black/40 z-30 md:hidden'
        onClick={()=>dispatch(closeMenu())}
      ></div>
    )}

    {/*mobile sidebar */}
    <div
        className={`fixed top-14 left-0 h-[calc(100vh-56px)] w-56 bg-white shadow-lg z-40 p-4 transform transition-transform duration-300 md:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent />
      </div>
      {/*Desktop sidebar*/}
        <div
        className={`hidden md:block bg-white shadow transition-all duration-300 overflow-hidden ${
          isMenuOpen ? "w-56 p-4" : "w-0 p-0"
        }`}
      >
        {isMenuOpen && <SidebarContent />}
      </div>
   
    </>
  )
}

export default Sidebar;