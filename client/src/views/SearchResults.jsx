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
  let [maxPriceFilterInitialValue, setMaxPriceFilterInitialValue] = React.useState(0);
  let [minPriceFilterInitialValue, setMinPriceFilterInitialValue] = React.useState(0);
  let [brandFilter, setBrandFilter] = React.useState([]);

  console.log(minPriceFilter, maxPriceFilter, "MIN AND MAX FILTERS");

  const products = props.searchResultsArray;

  const filteredSearchResultsArray = props.searchResultsArray.filter((product) => {
    console.log(product.price.value, "PRODUCT PRICE");
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
    setBrandFilter(newFilter)
  }

  const removeFromBrandFilter = (brand) => {
    const oldFilter = [...brandFilter];
    const newFilter = oldFilter.filter(brandInFilter => brand !== brandInFilter)
    setBrandFilter(newFilter)
  }

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search); // id=123
    let q = params.get("q"); // 123
    const sanitizedQuery = q.replaceAll("+", " ");

    setSearchTerm(sanitizedQuery);

    const filteredSearchResultsArray = props.searchResultsArray.filter((product) => {
      console.log(product.price.value, "PRODUCT PRICE");
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
    <Grid templateColumns="repeat(4, 1fr)" gap={6}>
      <GridItem colSpan={1} borderRight="1px" borderColor="gray.200">
        <Filters filterByPrice={filterByPrice} minPriceFilter={minPriceFilter} maxPriceFilter={maxPriceFilter} filteredSearchResultsArray={filteredSearchResultsArray} maxPriceFilterInitialValue={maxPriceFilterInitialValue} minPriceFilterInitialValue={minPriceFilterInitialValue} addToBrandFilter={addToBrandFilter} removeFromBrandFilter={removeFromBrandFilter} products={products} />
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
