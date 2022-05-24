import { Box, Divider, Heading, Text } from "@chakra-ui/react";
import * as React from "react";
import { ProductCard } from "../components/ProductCard";
// import { products } from "./_data";
import { ProductGrid } from "../components/ProductGrid";

export default function SearchResults(props) {

  let [searchTerm, setSearchTerm] = React.useState('')

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search); // id=123
    let q = params.get("q"); // 123
    const sanitizedQuery = q.replaceAll("+", " ");
    setSearchTerm(sanitizedQuery)
  }, []);

  const products = props.searchResultsArray;
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
      <Heading mx="auto" pb="20px" size="md">
        {products.length} Search Results for <Text as="span" color="teal">"{searchTerm}"</Text>
      </Heading>
      <Divider mb="20px" />
      <ProductGrid>
        {/* <h1>{products.length}</h1> */}
        {products.map((product) => (
          <ProductCard key={product.asin} product={product} />
        ))}
      </ProductGrid>
    </Box>
  );
}
