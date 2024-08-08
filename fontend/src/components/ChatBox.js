import { ChatState } from "../Context/ChatProvider";
import { Box } from "@chakra-ui/react";
import SingleChat from "./SingleChat";
const ChatBox=({fetchAgain , setFetchAgain})=>{
    const {selectedChat}=ChatState();
    return(
        // this styling is basically for smaller screen resolution 
        <Box display={{base:selectedChat ?"flex":"none", md:"flex"}}
        alignItems={'center'}
        flexDir={"column"}
        p={'3'}
        bg={'white'}
        width={{base:"100%", md:"68%"}}
        borderRadius={'lg'}
        borderWidth={'1px'}
        >
        <SingleChat fetchAgain={fetchAgain}
        setFetchAgain={setFetchAgain}/>
        </Box>
    )
}

export default ChatBox;