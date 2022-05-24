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

  // const { filteredSearchResultsArray } = props;
  const { minPriceFilter, maxPriceFilter } = props;

  // console.log(minPriceFilter, 'min', maxPriceFilter, 'max in filter component')

  // const highestPrice = filteredSearchResultsArray.sort((a, b) => {
  //   return b.price.value - a.price.value;
  // })[0].price.value;

  // const lowestPrice = filteredSearchResultsArray.sort((a, b) => {
  //     return a.price.value - b.price.value;
  // })[0].price.value;

  // let [minPrice, setMinPrice] = React.useState(lowestPrice)
  // let [maxPrice, setMaxPrice] = React.useState(highestPrice)

  const updatePriceFilter = (filter, value) => {
    if(filter == 'min') {
      // setMinPrice(value)
      props.filterByPrice(1, Number(value));
    } else if (filter == 'max') {
      // setMaxPrice(value)
      props.filterByPrice(0, Number(value));
    }
  }

  return (
    <Box
      maxW="7xl"
      mx="auto"
      px={{
        base: "4",
        md: "8",
        lg: "12",
      }}
      py={{
        base: "6",
        md: "8",
        lg: "12",
      }}
    >
      <Box
        mt={{
          base: "8",
          md: "16",
        }}
      >
        <Grid
          templateColumns={{
            base: "1fr",
            md: "240px 1fr",
          }}
          gap="14"
        >
          <Stack
            spacing="10"
            maxW="240px"
            display={{
              base: "none",
              md: "flex",
            }}
          >
            {/* <CheckboxFilter spacing="3" options={genderFilter.options} label="Gender" /> */}
            {/* <SizePicker {...sizeFilter} label="Size" /> */}
            {/* <ColorPicker {...colorFilter} label="Color" /> */}
            {/* <CheckboxFilter spacing="3" options={blueFilters.options} label="Brand" showSearch /> */}
            <Stack spacing="5">
              <label>Price range</label>
              <PriceRangePicker minPriceFilter={minPriceFilter} maxPriceFilter={maxPriceFilter} />
              {/* <PriceRangePicker defaultValue={[minPriceFilter, maxPriceFilter]} /> */}
              <HStack spacing="6">
                <Input type="number" onChange={(e) => updatePriceFilter("min", e.target.value)} value={minPriceFilter} placeholder="$500" />
                <Input type="number" onChange={(e) => updatePriceFilter("max", e.target.value)} value={maxPriceFilter} placeholder="$10000" />
              </HStack>
            </Stack>
          </Stack>
        </Grid>
      </Box>
    </Box>
  );
};
