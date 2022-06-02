import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./views/homepage/Home";
import Test from "./components/search/Microphone";
import SearchContainer from "./components/search/SearchContainer";
import SearchResults from "./views/searchresults/SearchResults";
import { ChakraProvider, Flex, Box, Divider } from "@chakra-ui/react";
import { useState } from "react";
import { Signup } from "./views/auth/Signup";
import { Login } from "./views/auth/Login";
import { useNavigate } from "react-router-dom";
import apiService from "./services/auth";
import Cart from "./views/cart/Cart";
import Profile from "./views/userprofile/Profile";
import ProductDetail from "./components/searchresults/ProductDetail";
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

  console.log(loggedInUser);

  React.useEffect(() => {
    const fetchUser = async () => {
      const res = await apiService.isLoggedIn();
      setLoggedInUser(res.data);
      setLoading(false);
    };
    fetchUser();
  }, []);

  const logoutHandler = async () => {
    console.log("logging out");
    await apiService.logout();
    setLoggedInUser(null);
    navigate("/");
  };

  const handleSearchResults = (searchResults) => {
    setSearchResultsArray(searchResults.data);
  };

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
                <Route path="/signup" element={<Signup setLoggedInUser={setLoggedInUser} />} />
                <Route path="/login" element={<Login cameFromCheckout={cameFromCheckout} setLoggedInUser={setLoggedInUser} />} />
                <Route path="/profile" element={<Profile loggedInUser={loggedInUser} />} />
                <Route path="/search" element={<SearchContainer handleSearchResults={handleSearchResults} />} />
                <Route path="/search/results" element={<SearchResults searchResultsArray={searchResultsArray} />} />
                <Route path="/search/results/:id/:price" element={<ProductDetail />} />
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
