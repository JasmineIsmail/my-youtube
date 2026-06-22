import { Link } from 'react-router-dom';
import { relativeTimeFormat } from '../utils/timeConverter';


const VideoCard = ({info}) => {
    const {snippet,statistics,id}= info;
    const {title,channelTitle,thumbnails,publishedAt}= snippet;
    const {viewCount}= statistics;
    const relativeTime= relativeTimeFormat(publishedAt);
    const videoId = id?.videoId||id;
  return (
    <div className='w-full p-1'>
      <img className='w-full aspect-video rounded-2xl shadow object-cover'
        src={thumbnails.high.url}/>
      <ul>
        <li className='mt-2 p-2 font-bold'>{title}</li>
        <li className='text-gray-400 pl-2'>{channelTitle}</li>
        <li  className='text-gray-400 pl-2'>{viewCount} views</li>
        <li  className='text-gray-400 pl-2'>{relativeTime}</li>
      </ul>
    </div>
  )
}

export default VideoCard;