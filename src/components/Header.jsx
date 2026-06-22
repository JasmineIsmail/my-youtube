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
  const [isMobileSearchActive, setIsMobileSearchActive] = useState(false);
  const searchCache = useSelector((store)=> store.search);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleToggleMenu= ()=>{
    dispatch(toggleMenu());
  }

  useEffect(()=>{
     const timer= setTimeout(()=>{
      if(searchCache[searchQuery]){
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
    dispatch(
      cacheResults ({
         [searchQuery] : results,
      })
    )
  }

  return (
    <div className='w-screen flex items-center justify-between md:grid md:grid-flow-col h-14 p-2 px-4 shadow-lg bg-white sticky top-0 z-50'>
    <div className={`flex items-center col-span-2 ${isMobileSearchActive ? 'hidden md:flex' : 'flex'}`}>
     <img 
        onClick={()=>handleToggleMenu()}
          className='h-5 md:h-6 mr-2 md:mx-4 cursor-pointer object-contain'
          alt="menu" 
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAbFBMVEX///8AAADp6ent7e0JCQk/Pz8PDw+Pj4+Hh4fDw8P7+/vV1dXg4OAZGRltbW3c3NwgICBgYGBnZ2ewsLCkpKRPT080NDR1dXVFRUXAwMB/f3/k5OS6urp5eXkpKSmzs7OMjIyXl5fPz89aWlquczz2AAABoUlEQVR4nO3d7U4aQRSA4ZWvygoiAoK2tS69/3usGH8725xNzrg8zxWcN8N+kMxkmwYAAAAAAAAAAAAA/tO0Uu0wee3+8LCo09PxboDA1cNNzW7jgdkJJcdo4Sm7oOg5FrjMnr/sFCt8yZ6/h5+hwm32+D3E7qfjLxz/r3T8d5pv8LT4FSwc/xO/Wc2yG770Oxz4bj9fz6q0eH0c4s37Yjqp00D/ngAAAAAAAAAAgKuy6Q7zKp3u/wyxK6q9z96c95VZcKf+JfApO6JgFy2segU/rGKBd9nzl21jhW/Z8/cwCRU+Zo/fwyZU+Dd7/B7OocJj9vg9xG41u+zxy15jT/12kR1Q1IUCm+Y5O6BkHgys/nc6n4YLm03F59fW3TAHEtrzsk6xU2sAAAAAAAAAAMB1as/djzrthtkUta/5AxfbATbu1X4cIbbL+12XXVAUXMVJ9vxlL2Nfwpt1bBFrvwovnLe49jXssscvC16H3+BeGv06QpcdUBR+q6n9Shzg+w/7mg8GHWKHDz+1y+62Sm+78EspAAAAAAAAAAAAAIzOP09WOq3tUN5KAAAAAElFTkSuQmCC" />
     <img className='h-7  md:h-7 w-36 cursor-pointer object-contain'
          alt='youtube-logo'
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7B8IYvwl0lSvCMgLdeXIR-irI3mbjCb6LEI61gmZ5Jg&s=10"
     />
    </div>
    <div className={`col-span-8 relative items-center justify-center ${isMobileSearchActive ? 'flex w-full' : 'hidden md:flex'}`}>
      {isMobileSearchActive && (
          <button 
            onClick={() => setIsMobileSearchActive(false)} 
            className="p-2 mr-2 md:hidden text-gray-600 hover:bg-gray-100 rounded-full"
          >
            ⬅
          </button>
        )}
      <div className='flex w-full max-w-[600px] items-center h-9'>
      <input className='border h-full w-full p-1.5 px-4 rounded-l-full border-gray-400 focus:outline-none focus:border-blue-500 text-sm' 
             placeholder="Search"
             type='text' value={searchQuery}
             onChange={(e)=>setSearchQuery(e.target.value)}
             onFocus={()=>setShowSuggestion(true)}
             onBlur={()=>setShowSuggestion(false)}
        
      />
      <button className='border h-full p-1.5 px-5 bg-gray-50 border-gray-400 rounded-r-full hover:bg-gray-100 border-l-0'>
            <span className="text-sm font-medium text-gray-600">Search</span>
      </button>
      </div>
       {showSuggestion && suggestions.length > 0 && (
      <div className='absolute top-full left-0 right-0 md:left-2 mx-auto bg-white max-w-[600px] shadow-lg rounded-b-xl border border-gray-200 mt-1 z-50'>
        <ul>
         {suggestions.map(s=>
          <li key={s.id} 
              onMouseDown={()=>{
                navigate(`/watch?v=${s.id}`)
                setShowSuggestion(false)
                 setSearchQuery("");
                }
              }
              className='py-2 px-3 shadow-sm hover:bg-gray-100 cursor-pointer flex items-center gap-3 text-sm'
          >{s.title}</li>)
          }
        </ul>
      </div>)}
    </div>
    <div className={`flex items-center gap-2 md:gap-4 col-span-2 justify-end ${isMobileSearchActive ? 'hidden md:flex' : 'flex'}`}>
      <button 
          onClick={() => setIsMobileSearchActive(true)}
          className="p-2 md:hidden hover:bg-gray-100 rounded-full text-lg"
          aria-label="Activate Search"
        >
          🔍
      </button>
      <img alt='user-icon'
           className='h-7 w-7 rounded-full object-cover cursor-pointer'
            src='data:image/png;base64,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'
      />
    </div>
    </div>
  )
}
export default Header;