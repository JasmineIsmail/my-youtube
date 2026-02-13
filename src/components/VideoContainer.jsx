import React, { useEffect, useState, version } from 'react'
import { YOUTUBE_VIDEOLIST_API } from '../utils/constants';
import { Link } from 'react-router-dom';
import VideoCard from './VideoCard';


const VideoContainer = () => {

  const [videos,setVideos]= useState([]);

  useEffect(()=>{
    getVideos();
  },[])

  const getVideos= async ()=>{
    const data= await fetch(YOUTUBE_VIDEOLIST_API);
    const jsonData= await data.json();
    //console.log(jsonData);
    setVideos(jsonData.items);
  }
  
  return (
    <div className='flex flex-wrap'>
    {videos.length === 0? 
      (<div>Loading videos</div>) :
      videos.map((v) =>(
        <Link  key={v.id} to={"/watch?v="+v.id}>
          <VideoCard  info={v} />
        </Link>
      ))
    }
   </div>
  )
}


export default VideoContainer;
