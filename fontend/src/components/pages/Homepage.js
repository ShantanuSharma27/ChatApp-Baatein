import { Container, Box, Text } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Login from "../Authentication/Login";
import Signup from "../Authentication/Signup";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Homepage = () => {
  const navigate=useNavigate();
  //this use effect checks if user is already login or not by retreiving intfo from local storage.
      useEffect(()=>{
        const userInfo=JSON.parse(localStorage.getItem("userInfo"));
        if(!userInfo){
            navigate("/chats");
        }
    },[navigate]);

  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={2}
        bg="whitesmoke"
        w="80%"
        m="40px 0 15px 0"
        ml="-500px" 
        mt={'100px'}
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text
          textAlign="center"
          fontSize="4xl"
          fontFamily="Work Sans"
          color="black"
        >
          Baatein
        </Text>
      </Box>
      <Box
        bg="whitesmoke"
        w="80%"
        p={2}
        borderRadius="lg"
        borderWidth="1px"
        marginLeft="-500px"
      >
        <Tabs variant="soft-rounded" colorScheme="purple">
          <TabList mb="1em">
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Homepage;
