
import { useEffect, useState } from 'react';
import ChatMessage from './ChatMessage';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../utils/chatSlice';
import {randomNamesGenerater, stringGenerater} from '../utils/helper';

const LiveChat = () => {
    const [chatMessage,setChatMessage] = useState("");
    const dispatch = useDispatch();
    const chatMessages = useSelector(store => store.chat.messages);
    useEffect(()=>{
        const i= setInterval(()=>{
            //API Polling
            dispatch(addMessage({
                id: crypto.randomUUID(),
                name:randomNamesGenerater(),
                message: stringGenerater()
            }))

        },2000)

        return()=>clearInterval(i);
    },[])
  return (
    <>
    <div className="p-4 border border-black shadow-lg h-[500px] rounded-lg w-full overflow-y-scroll flex  flex-col-reverse">
       <div>
       {
        chatMessages.map ((c,i)=>( 
            <ChatMessage name={c.name} message={c.message} key={c.id} />
        ))
       }
    </div>
    </div>
     <form 
        className='w-full p-2 border border-black'
        onSubmit={(e)=>  {
            e.preventDefault();
            dispatch(addMessage({
                id: crypto.randomUUID(),
                name: "Jasmine",
                message : chatMessage
            }))
            setChatMessage("");
        }}
    >
        
        <input
        type='text' 
        className='flex-1 min-w-0 px-2 py-1 border border-gray-400 rounded'
        value={chatMessage}
        onChange={(e)=>setChatMessage(e.target.value)}
        />
        <button className='px-4 py-1 bg-green-400 text-black font-medium rounded-lg shrink-0 hover:bg-green-500 transition'>Send</button>
    </form>
    
    </>
  )
}

export default LiveChat;  