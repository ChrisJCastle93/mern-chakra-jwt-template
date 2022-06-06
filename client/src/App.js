import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import authService from "./services/auth";

import Home from "./views/homepage/Home";
import { Signup } from "./views/auth/Signup";
import { Login } from "./views/auth/Login";

import { Footer } from "./components/footer/Footer";
import { Navbar } from "./components/navbar/Navbar";

import { Flex, Box, Divider, Spinner } from "@chakra-ui/react";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log(loggedInUser)

  const navigate = useNavigate();

  const logoutHandler = async () => {
    console.log('CLICKED LOGOUT HANDLER')
    await authService.logout();
    setLoggedInUser(null);
    navigate("/");
  };

  // useEffect - runs only on first render

  React.useEffect(() => {
    const fetchUser = async () => {
      const res = await authService.isLoggedIn();
      setLoggedInUser(res);
      setLoading(false);
    };
    fetchUser();
  }, []);

  return (
    <>
      {loading ? (
        <Flex w="100vw" h="100vh" alignItems="center" justifyContent="center">
          <Spinner thickness="4px" speed="1s" color="brand.500" m={8} p={8} />
        </Flex>
      ) : (
        <Box className="App">
          <Flex minH="100vh" direction="column">
            <Navbar as="nav" loggedInUser={loggedInUser} logoutHandler={logoutHandler} />
            <Flex as="main" align="stretch" flexGrow="1">
              <Routes>
                <Route path="/" element={<Home loggedInUser={loggedInUser} />} />
                <Route path="/signup" element={<Signup setLoggedInUser={setLoggedInUser} />} />
                <Route path="/login" element={<Login setLoggedInUser={setLoggedInUser} />} />
              </Routes>
            </Flex>
            <Divider />
            <Footer as="footer" />
          </Flex>
        </Box>
      )}
    </>
  );
}
export default App;
