import { Center, HStack, Box, Flex, Spinner } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import Microphone from "./Microphone";
import { useNavigate } from "react-router-dom";

export default function SearchContainer(props) {
  let [searchTerm, setSearchTerm] = useState("");
  let [speechDone, setSpeechDone] = useState(false);
  let [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const searchHandler = (value) => {
    setSearchTerm(value);
  };

  const handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }
    searchAmazon();
  };

  useEffect(() => {
    if (speechDone) {
      searchAmazon();
    }
  }, [speechDone]);

  const searchAmazon = async () => {
    setIsLoading(true);
    const queryString = new URLSearchParams({ q: searchTerm }).toString();
    const searchResults = await axios.get(`${process.env.REACT_APP_API_URL}/api/search?${queryString}`);
    props.handleSearchResults(searchResults);
    setIsLoading(false);
    navigate(`/search/results?q=${searchTerm}`);
  };

  const updateSpeechDone = () => {
    setSpeechDone(true);
  };

  return (
    <Flex>
      {isLoading ? (
        <Flex flex="1" align="center" justify="center">
          <Spinner thickness="2px" speed="1s" color="teal" m={2} p={2} />
        </Flex>
      ) : (
        <>
          <Box flex="1">
            <SearchBar searchTerm={searchTerm} searchHandler={searchHandler} setIsLoading={setIsLoading} handleSubmit={handleSubmit} />
          </Box>
          <Microphone searchHandler={searchHandler} setIsLoading={setIsLoading} handleSubmit={handleSubmit} updateSpeechDone={updateSpeechDone} />
        </>
      )}
    </Flex>
  );
}
