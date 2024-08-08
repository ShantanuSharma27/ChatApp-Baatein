import { useState, useEffect } from "react";
import { ChatState } from "../Context/ChatProvider";
import { useToast } from "@chakra-ui/react";
import { Box } from "@chakra-ui/layout";
import { Button ,Text,Stack} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import {getSender} from '../config/ChatLogics'
import axios from "axios";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";
// import { ChatBox,Shantanu } from "./ChatBox";
const MyChats = ({fetchAgain}) => {
  const { selectedChat,user, setSelectedChat, chats, setChats } = ChatState();
  const [loggedUser, setLoggedUser] = useState();  // Corrected useState initialization
  const toast = useToast();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/chat`, config);
      setChats(data);
      console.log(data);
    } catch (err) {
      toast({
        title: "Error Occurred",
        description: "Failed to fetch chats",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchChats();
     setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
  }, [fetchAgain]); // Dependency array ensures this runs when 'user' changes

  return (
    <Box       
    dsiplay={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "60%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px">
        <Box
         pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        d="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center">
            My Chats
            <GroupChatModal>
            <Button
             d="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}>
                New Group
            </Button>
            </GroupChatModal>
        </Box>
        <Box  d="flex"
        flexDir="column"
        p={3}
        bg="whitesmoke"
        w="100%"
        h="90%"
        borderRadius="lg"
        overflowY="hidden">
            {chats?(
                <Stack overflowY='scroll'>
                    {chats.map((chat)=>(
                        <Box  onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "purple" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}>
                        <Text>
                           {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                        </Text>
                        </Box>
                    ))}
                </Stack>
                ):(
                   <ChatLoading/>
                )}
        </Box>
    </Box>
  );
};

export default MyChats;
