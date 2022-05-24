import { Box, Divider, Heading, Grid, Text, GridItem } from "@chakra-ui/react";
import * as React from "react";
import { ProductCard } from "../components/ProductCard";
// import { products } from "./_data";
import { ProductGrid } from "../components/ProductGrid";
import { Filters } from "../components/searchresults/filters/Filters";

export default function SearchResults(props) {
  let [searchTerm, setSearchTerm] = React.useState("");
  let [minPriceFilter, setMinPriceFilter] = React.useState(0);
  let [maxPriceFilter, setMaxPriceFilter] = React.useState(0);

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search); // id=123
    let q = params.get("q"); // 123
    const sanitizedQuery = q.replaceAll("+", " ");
    setSearchTerm(sanitizedQuery);
  }, []);

  const products = props.searchResultsArray;
  const filteredSearchResultsArray = props.searchResultsArray.filter((product) => product.rating > 4 && product.price.value > 20);

  const filterByPrice = (min, value) => {
    if (!min) {
      console.log("setting max price");
      setMaxPriceFilter(value);
    } else {
      console.log("setting min price");
      setMinPriceFilter(value);
    }
  };

  React.useEffect(() => {
    if (products.length > 0) {
      console.log('TRIGGERED')
      console.log(products.length)
      setMaxPriceFilter(
        filteredSearchResultsArray.sort((a, b) => {
          return b.price.value - a.price.value;
        })[0].price.value
      );

      setMinPriceFilter(
        filteredSearchResultsArray.sort((a, b) => {
          return a.price.value - b.price.value;
        })[0].price.value
      );
    }
  }, [products, filteredSearchResultsArray]);


  console.log(minPriceFilter, 'min', maxPriceFilter, 'max')

  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={6}>
      <GridItem colSpan={1} borderRight="1px" borderColor="gray.200">
        <Filters filterByPrice={filterByPrice} minPriceFilter={minPriceFilter} maxPriceFilter={maxPriceFilter} filteredSearchResultsArray={filteredSearchResultsArray} />
      </GridItem>
      <GridItem
        colSpan={3}
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
        <Heading mx="auto" pb="20px" size="md">
          {filteredSearchResultsArray.length} Search Results for{" "}
          <Text as="span" color="teal">
            "{searchTerm}"
          </Text>
        </Heading>
        <Divider mb="20px" />
        <ProductGrid>
          {/* <h1>{products.length}</h1> */}
          {filteredSearchResultsArray.map((product) => (
            // {products.map((product) => (
            <ProductCard key={product.asin} product={product} />
          ))}
        </ProductGrid>
      </GridItem>
    </Grid>
  );
}
