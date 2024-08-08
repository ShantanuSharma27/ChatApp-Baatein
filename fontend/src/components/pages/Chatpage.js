import { 
  ChatState
 } from "../../Context/ChatProvider";
import { Box } from "@chakra-ui/react";
import SideDrawer from "../miscellaneous/SideDrawer";
import ChatBox from "../ChatBox";
import MyChats from "../MyChats";
import { useState } from "react";
const ChatPage=()=>{
  const {user}=ChatState();
  const[fetchAgain,setFetchAgain]=useState(false);//to trigger refetching of chats
  console.log(user);
  return(
    <div style={{width:"100%"}}>
     {user && <SideDrawer/>}
     <Box display="flex"
     justifyContent={'space-between'}
     w ='100%'
     h={'91.5vh'}
     padding={'10px'}>
        {user && <MyChats
        fetchAgain={fetchAgain}/>}
        {user && <ChatBox
        fetchAgain={fetchAgain}
        setFetchAgain={setFetchAgain}/>}
     </Box>

    </div>
  )
}

export default ChatPage;
