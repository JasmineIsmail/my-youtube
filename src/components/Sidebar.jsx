import React from 'react'
import { useSelector } from 'react-redux';
import store from '../utils/store';
import { Link } from 'react-router-dom';

const Sidebar = () => {

  const isMenuOpen = useSelector((store)=>store.app.isMenuOpen);
  if(!isMenuOpen) return null;
  return (
    <div className='m-2 p-4 w-48  border-none shadow'>
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
    </div>
  )
}

export default Sidebar;