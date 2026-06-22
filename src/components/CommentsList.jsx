import React, { useEffect, useState } from 'react';
import { COMMENTS_API } from '../utils/constants';
import Comment from './Comment';
const CommentsList = ({id}) => {
    const [comments,setcomments]= useState([]);
    useEffect(()=>{
      getComments();
    },[id]);
    const  getComments = async ()=>{
        const data =await fetch(`${COMMENTS_API}&videoId=${id}`);
        const json= await data.json();
        setcomments(json.items);
    }

  return (
    <div>
      {
        comments ? comments.map((c) =>(
        <Comment key= {c.id} data={c}/>)) :null
      }
    
    </div>
  )
}

export default CommentsList;