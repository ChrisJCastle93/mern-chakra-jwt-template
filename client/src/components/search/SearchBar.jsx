import React from "react";
import { Icon, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { RiSearchLine } from "react-icons/ri";

export default function SearchBar(props) {
  const handleChange = (e) => {
    let { value } = e.target;
    props.searchHandler(value);
  };

  return (
    <form onSubmit={(e) => props.handleSubmit(e)}>
      <InputGroup>
        <InputLeftElement>
          <Icon as={RiSearchLine} color="gray.500" fontSize="lg" />
        </InputLeftElement>
        <Input borderRightRadius="0" focusBorderColor="blue.500" width="full" fontSize="sm" variant="filled" type="text" placeholder="What are you looking for? Use the microphone to search by voice." autoComplete="off" value={props.searchTerm} onChange={(e) => handleChange(e)} />
      </InputGroup>
    </form>
  );
}
