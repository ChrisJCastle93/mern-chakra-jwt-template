import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import apiService from "./services/auth";

import Home from "./views/homepage/Home";
import SearchContainer from "./components/search/SearchContainer";
import SearchResults from "./views/searchresults/SearchResults";
import { Signup } from "./views/auth/Signup";
import { Login } from "./views/auth/Login";
import { useNavigate } from "react-router-dom";
import Cart from "./views/cart/Cart";
import Profile from "./views/userprofile/Profile";
import ProductDetail from "./components/searchresults/ProductDetail";
import { Footer } from "./components/footer/Footer";
import { cartService } from "./services/localStorage";
import { NavbarOne } from "./components/navbar/NavbarOne";

import { ChakraProvider, Flex, Box, Divider, Spinner } from "@chakra-ui/react";

function App() {
  // state
  let [searchResultsArray, setSearchResultsArray] = useState([]);
  let [cameFromCheckout, setCameFromCheckout] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // router
  const navigate = useNavigate();

  // functions to pass down

  const loginToCheckout = () => {
    setCameFromCheckout(true);
  };

  const logoutHandler = async () => {
    await apiService.logout();
    setLoggedInUser(null);
    navigate("/");
  };

  const handleSearchResults = (searchResults) => {
    setSearchResultsArray(searchResults.data);
  };

  // local storage

  const cart = cartService.getFromLocalStorage("cart");

  if (!cart) {
    const resetCart = [];
    cartService.addToLocalStorage("cart", resetCart);
  }

  // useEffect - runs only on first render

  React.useEffect(() => {
    const fetchUser = async () => {
      const res = await apiService.isLoggedIn();
      setLoggedInUser(res.data);
      setLoading(false);
    };
    fetchUser();
  }, []);

  return (
    <ChakraProvider>
      {loading ? (
        <Flex w="100vw" h="100vh" alignItems="center" justifyContent="center">
          <Spinner thickness="4px" speed="1s" color="teal" m={8} p={8} />
        </Flex>
      ) : (
        <Box className="App">
          <Flex minH="100vh" direction="column">
            <NavbarOne loggedInUser={loggedInUser} logoutHandler={logoutHandler} handleSearchResults={handleSearchResults} cart={cart} />
            <Box flexGrow="1">
              <Routes>
                <Route path="/" element={<Home loggedInUser={loggedInUser} />} />
                <Route path="/:id" element={<Home loggedInUser={loggedInUser} />} />
                <Route path="/signup" element={<Signup setLoggedInUser={setLoggedInUser} />} />
                <Route path="/login" element={<Login cameFromCheckout={cameFromCheckout} setLoggedInUser={setLoggedInUser} />} />
                <Route path="/cart" element={<Cart loggedInUser={loggedInUser} loginToCheckout={loginToCheckout} />} />
                <Route path="/profile" element={loggedInUser ? <Profile loggedInUser={loggedInUser} /> : <Navigate to="/login" replace />} />
                <Route path="/search" element={<SearchContainer handleSearchResults={handleSearchResults} />} />
                <Route path="/search/results" element={<SearchResults searchResultsArray={searchResultsArray} />} />
                <Route path="/search/results/:id/:price" element={<ProductDetail />} />
              </Routes>
            </Box>
            <Divider />
            <Footer />
          </Flex>
        </Box>
      )}
    </ChakraProvider>
  );
}
export default App;
