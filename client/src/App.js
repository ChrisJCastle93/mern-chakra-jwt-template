import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Test from "./components/search/Microphone";
import SearchContainer from "./components/search/SearchContainer";
import SearchResults from "./views/SearchResults";
import { ChakraProvider, Flex, Box, Divider } from "@chakra-ui/react";
import { useState } from "react";
import { Signup } from "./views/auth/Signup";
import { Login } from "./views/auth/Login";
import { useNavigate } from "react-router-dom";
import apiService from "./views/services/auth";
import Cart from "./views/cart/Cart";
import Profile from "./views/Profile";
import ProductDetail from "./components/ProductDetail";
import Checkout from "./views/checkout/Checkout";
import { UpdateUserForm } from "./views/auth/UpdateUserForm";
import "../src/css/authForm.css";
import { Footer } from "./components/footer/Footer";
import { cartService } from "./services/localStorage";
import { NavbarOne } from "./components/navbar/NavbarOne";

function App() {
  let [searchResultsArray, setSearchResultsArray] = useState([]);
  let [cameFromCheckout, setCameFromCheckout] = useState(false);

  const loginToCheckout = () => {
    setCameFromCheckout(true);
  };

  const cart = cartService.getFromLocalStorage("cart");

  if (!cart) {
    const resetCart = [];
    cartService.addToLocalStorage("cart", resetCart);
  }

  const navigate = useNavigate();

  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchUser = async () => {
      const res = await apiService.isLoggedIn();
      setLoggedInUser(res.data);
      setLoading(false);
    };
    fetchUser();
  }, []);

  const logoutHandler = async () => {
    await apiService.logout();
    setLoggedInUser(null);
    navigate("/");
  };

  const handleSearchResults = (searchResults) => {
    setSearchResultsArray(searchResults.data);
  };

  console.log('USER', loggedInUser)

  return (
    <ChakraProvider>
      {loading ? (
        <div>Loading.....</div>
      ) : (
        <div className="App">
          <Flex minH="100vh" direction="column">
            <NavbarOne loggedInUser={loggedInUser} logoutHandler={logoutHandler} handleSearchResults={handleSearchResults} cart={cart} />
            <Box flexGrow="1">
              <Routes>
                <Route path="/" element={<Home loggedInUser={loggedInUser} />} />
                <Route path="/:id" element={<Home loggedInUser={loggedInUser} />} />
                <Route path="/test" element={<Test />} />
                <Route path="/cart" element={<Cart loggedInUser={loggedInUser} loginToCheckout={loginToCheckout} />} />
                <Route path="/profile/edit" element={<UpdateUserForm loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />} />
                <Route path="/signup" element={<Signup setLoggedInUser={setLoggedInUser} />} />
                <Route path="/login" element={<Login cameFromCheckout={cameFromCheckout} setLoggedInUser={setLoggedInUser} />} />
                <Route path="/profile" element={<Profile loggedInUser={loggedInUser} />} />
                <Route path="/search" element={<SearchContainer handleSearchResults={handleSearchResults} />} />
                <Route path="/search/results" element={<SearchResults searchResultsArray={searchResultsArray} />} />
                <Route path="/search/results/:id/:price" element={<ProductDetail />} />
                {/* <Route path="/checkout/:id" element={<Checkout loggedInUser={loggedInUser} />} /> */}
              </Routes>
            </Box>
            <Divider />
            <Footer />
          </Flex>
        </div>
      )}
    </ChakraProvider>
  );
}
export default App;
