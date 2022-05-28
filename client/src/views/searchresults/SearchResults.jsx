import { Box, Divider, Heading, Grid, Text, Flex, GridItem } from "@chakra-ui/react";
import * as React from "react";
import { ProductCard } from "../../components/searchresults/ProductCard";
import { ProductGrid } from "../../components/searchresults/ProductGrid";
import { Filters } from "../../components/searchresults/filters/Filters";

export default function SearchResults(props) {
  let [searchTerm, setSearchTerm] = React.useState("");
  let [minPriceFilter, setMinPriceFilter] = React.useState(0);
  let [maxPriceFilter, setMaxPriceFilter] = React.useState(0);
  let [maxPriceFilterInitialValue, setMaxPriceFilterInitialValue] = React.useState(0);
  let [minPriceFilterInitialValue, setMinPriceFilterInitialValue] = React.useState(0);
  let [brandFilter, setBrandFilter] = React.useState([]);

  const products = props.searchResultsArray;

  const filteredSearchResultsArray = props.searchResultsArray.filter((product) => {
    return product.price.value > minPriceFilter && product.price.value < maxPriceFilter;
  });

  const filterByPrice = (min, value) => {
    if (!min) {
      setMaxPriceFilter(value);
    } else {
      setMinPriceFilter(value);
    }
  };

  const addToBrandFilter = (brand) => {
    const newFilter = [...brandFilter, brand];
    setBrandFilter(newFilter);
  };

  const removeFromBrandFilter = (brand) => {
    const oldFilter = [...brandFilter];
    const newFilter = oldFilter.filter((brandInFilter) => brand !== brandInFilter);
    setBrandFilter(newFilter);
  };

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search); // id=123
    let q = params.get("q"); // 123
    const sanitizedQuery = q.replaceAll("+", " ");

    setSearchTerm(sanitizedQuery);

    const filteredSearchResultsArray = props.searchResultsArray.filter((product) => {
      return product.price.value > minPriceFilter && product.price.value < maxPriceFilter;
    });

    if (products.length > 0) {
      setMaxPriceFilter(
        products.sort((a, b) => {
          return b.price.value - a.price.value;
        })[0].price.value
      );

      setMaxPriceFilterInitialValue(
        products.sort((a, b) => {
          return b.price.value - a.price.value;
        })[0].price.value
      );

      setMinPriceFilter(
        products.sort((a, b) => {
          return a.price.value - b.price.value;
        })[0].price.value
      );

      setMinPriceFilterInitialValue(
        products.sort((a, b) => {
          return a.price.value - b.price.value;
        })[0].price.value
      );
    }
  }, []);

  return (
    <Flex direction="column">
      {/* <Box> */}
        <Filters filterByPrice={filterByPrice} minPriceFilter={minPriceFilter} maxPriceFilter={maxPriceFilter} filteredSearchResultsArray={filteredSearchResultsArray} maxPriceFilterInitialValue={maxPriceFilterInitialValue} minPriceFilterInitialValue={minPriceFilterInitialValue} addToBrandFilter={addToBrandFilter} removeFromBrandFilter={removeFromBrandFilter} products={products} />
      {/* </Box> */}
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        <GridItem
          colSpan={4}
          mx="auto"
          px={{
            base: "4",
            md: "4",
            lg: "6",
          }}
          py={{
            base: "6",
            md: "8",
            lg: "12",
          }}
        >
          <Heading mx="auto" pb="20px" size="md">
            {filteredSearchResultsArray.length} Search Results for{" "}
            <Text as="span" color="teal">
              "{searchTerm}"
            </Text>
          </Heading>
          <Divider mb="20px" />
          <ProductGrid>
            {filteredSearchResultsArray.map((product,index) => (
              <ProductCard key={index}  product={product} />
            ))}
          </ProductGrid>
        </GridItem>
      </Grid>
    </Flex>
  );
}
