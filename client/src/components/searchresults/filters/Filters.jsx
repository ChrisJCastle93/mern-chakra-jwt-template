import { Box, Grid, Heading, HStack, Input, Stack, Text } from "@chakra-ui/react";
import * as React from "react";
import { CheckboxFilter } from "./CheckboxFilter";
import { ColorPicker } from "./ColorPicker";
import { PriceRangePicker } from "./PriceRangePicker";
import { ProductBreadcrumb } from "./ProductBreadcrumb";
import { SizePicker } from "./SizePicker";
import { SortbySelect } from "./SortBySelect";
import { MobileFilter } from "./MobileFilter";
import { blueFilters, breadcrumbData, colorFilter, genderFilter, sizeFilter } from "./_data";

export const Filters = (props) => {
  const { minPriceFilter, maxPriceFilter, maxPriceFilterInitialValue, products, minPriceFilterInitialValue } = props;

  const updatePriceFilter = (filter, value) => {
    if (filter == "min") {
      props.filterByPrice(1, Number(value));
    } else if (filter == "max") {
      props.filterByPrice(0, Number(value));
    }
  };

  return (
    <Box w="80%" mt={4} mx="auto">
      <Box>
        <Stack spacing="5">
          <Heading fontSize="sm">Price range</Heading>
          <Box h={10} bg="red">
            <PriceRangePicker minPriceFilter={minPriceFilter} maxPriceFilter={maxPriceFilter} updatePriceFilter={updatePriceFilter} maxPriceFilterInitialValue={maxPriceFilterInitialValue} minPriceFilterInitialValue={minPriceFilterInitialValue} />
          </Box>
          {/* <PriceRangePicker defaultValue={[minPriceFilter, maxPriceFilter]} /> */}
          <HStack width="max-content" spacing="2">
            <Input w={100} type="number" fontSize="xs" onChange={(e) => updatePriceFilter("min", e.target.value)} value={minPriceFilter} placeholder="$500" />
            <Input w={100} type="number" fontSize="xs" onChange={(e) => updatePriceFilter("max", e.target.value)} value={maxPriceFilter} placeholder="$10000" />
          </HStack>
        </Stack>
      </Box>
    </Box>
  );
};
