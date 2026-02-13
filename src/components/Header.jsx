import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { toggleMenu } from '../utils/appSlice';
import { SEARCH_API } from '../utils/constants';
import { useNavigate } from 'react-router-dom';
import {cacheResults  } from "../utils/searchSlice";


const Header = () => {

  const [searchQuery,setSearchQuery]= useState("");
  const [suggestions,setSuggestions] = useState([]);
  const [showSuggestion,setShowSuggestion]= useState(false);
  
  const searchCache = useSelector((store)=> store.search);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleToggleMenu= ()=>{
    dispatch(toggleMenu());
  }

  useEffect(()=>{
     const timer= setTimeout(()=>{
      if(searchCache[setSearchQuery]){
        setSuggestions(searchCache[searchQuery])

      }else{
        getSearchSuggestion();
      }
    },200)

     return ()=>{
      clearTimeout(timer);
     }
    
  },[searchQuery])
  useEffect (()=>{
    const hideOnScroll = ()=>{
      setShowSuggestion(false);
    }
    window.addEventListener("scroll",hideOnScroll);
    return ()=>{
      window.removeEventListener("scroll",hideOnScroll);
    }
  },[])
  const getSearchSuggestion = async ()=>{
     if (!searchQuery) {
    setSuggestions([]);
    return;
    }
    
    const res= await fetch(SEARCH_API+searchQuery);
    const json= await res.json();
    
    const results = json?.items?.map((item) => ({
      title: item.snippet.title,
      id: item.id.videoId
      })
    ) || [];
    setSuggestions(results);

    // update cache

    dispatch(
      cacheResults ({
         [searchQuery] : results,
      })
    )
  }

  return (
    <div className='grid grid-flow-col h-14 p-2 m-2 shadow-lg'>
    <div className="flex col-span-1">
     <img 
        onClick={()=>handleToggleMenu()}
          className='h-7 mx-4 cursor-pointer'
          alt="menu" 
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAbFBMVEX///8AAADp6ent7e0JCQk/Pz8PDw+Pj4+Hh4fDw8P7+/vV1dXg4OAZGRltbW3c3NwgICBgYGBnZ2ewsLCkpKRPT080NDR1dXVFRUXAwMB/f3/k5OS6urp5eXkpKSmzs7OMjIyXl5fPz89aWlquczz2AAABoUlEQVR4nO3d7U4aQRSA4ZWvygoiAoK2tS69/3usGH8725xNzrg8zxWcN8N+kMxkmwYAAAAAAAAAAAAA/tO0Uu0wee3+8LCo09PxboDA1cNNzW7jgdkJJcdo4Sm7oOg5FrjMnr/sFCt8yZ6/h5+hwm32+D3E7qfjLxz/r3T8d5pv8LT4FSwc/xO/Wc2yG770Oxz4bj9fz6q0eH0c4s37Yjqp00D/ngAAAAAAAAAAgKuy6Q7zKp3u/wyxK6q9z96c95VZcKf+JfApO6JgFy2segU/rGKBd9nzl21jhW/Z8/cwCRU+Zo/fwyZU+Dd7/B7OocJj9vg9xG41u+zxy15jT/12kR1Q1IUCm+Y5O6BkHgys/nc6n4YLm03F59fW3TAHEtrzsk6xU2sAAAAAAAAAAMB1as/djzrthtkUta/5AxfbATbu1X4cIbbL+12XXVAUXMVJ9vxlL2Nfwpt1bBFrvwovnLe49jXssscvC16H3+BeGv06QpcdUBR+q6n9Shzg+w/7mg8GHWKHDz+1y+62Sm+78EspAAAAAAAAAAAAAIzOP09WOq3tUN5KAAAAAElFTkSuQmCC" />
     <img className='h-12 mx-2 my-0'
          alt='youtube-logo'
          src="data:image/png;base64,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"
     />
    </div>
    <div className='col-span-10 relative'>
      <div>
      <input className='border w-1/2  p-0.5 rounded-l-full  border-gray-400' placeholder="Search"
        type='text' value={searchQuery}
        onChange={(e)=>setSearchQuery(e.target.value)}
        onFocus={()=>setShowSuggestion(true)}
        onBlur={()=>setShowSuggestion(false)}
        
      />
      <button className='border p-0.5 border-gray-400 rounded-r-full'>Search</button>
      </div>
       {showSuggestion && suggestions.length > 0 && (
      <div className='absolute top-full left-0 bg-white px-2 py-2 w-[500px] shadow-lg rounded-lg border border-gray-100'>
        <ul>
         
           {suggestions.map(s=>
          <li key={s.id} 
              onMouseDown={()=>{
                navigate(`/watch?v=${s.id}`)
                setShowSuggestion(false)}
              }
              onClick={()=>{
                setSearchQuery("");
                setShowSuggestion(false);
              }}
              className='py-2 px-3 shadow-sm hover:bg-gray-100'>{s.title}</li>)
           
          }
        </ul>
        
      </div>)}
    </div>
    <div className='col-span-1'>
      <img alt='user-icon'
           className='h-7'
            src='data:image/png;base64,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'
      />
    </div>
    </div>
  )
}


export default Header;