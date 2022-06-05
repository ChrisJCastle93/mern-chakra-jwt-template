import * as React from "react";

import { PriceRangePicker } from "./PriceRangePicker";

import { Box, Heading, HStack, Input, Stack } from "@chakra-ui/react";

export const Filters = (props) => {
  
  const { minPriceFilter, maxPriceFilter, maxPriceFilterInitialValue, minPriceFilterInitialValue } = props;

  const updatePriceFilter = (filter, value) => {
    if (filter === "min") {
      props.filterByPrice(1, Number(value));
    } else if (filter === "max") {
      props.filterByPrice(0, Number(value));
    }
  };

  return (
    <Box w="90%" mt={4} mx="auto">
      <Box>
        <Stack spacing="5">
          <Heading fontSize="sm">Price range</Heading>
          <Box h={10}>
            <PriceRangePicker minPriceFilter={minPriceFilter} maxPriceFilter={maxPriceFilter} updatePriceFilter={updatePriceFilter} maxPriceFilterInitialValue={maxPriceFilterInitialValue} minPriceFilterInitialValue={minPriceFilterInitialValue} />
          </Box>
          <HStack width="max-content" spacing="2">
            <Input w={100} type="number" fontSize="xs" onChange={(e) => updatePriceFilter("min", e.target.value)} value={minPriceFilter} placeholder="$500" />
            <Input w={100} type="number" fontSize="xs" onChange={(e) => updatePriceFilter("max", e.target.value)} value={maxPriceFilter} placeholder="$10000" />
          </HStack>
        </Stack>
      </Box>
    </Box>
  );
};
