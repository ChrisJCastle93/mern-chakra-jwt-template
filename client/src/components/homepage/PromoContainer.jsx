import React from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Image, Badge, Flex, Heading, Divider, Grid, GridItem } from "@chakra-ui/react";

export default function PromoContainer(props) {
  const [listOfPromo, setListOfPromo] = useState([]);

  React.useEffect(() => {
    const queryString = new URLSearchParams(props.queryString);
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/search?${queryString}`)
      .then((response) => {
        setListOfPromo(response.data.slice(0, 4));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Heading w="90%" mx="auto" pb="20px" pt="40px" size="lg">
        {props.header}
      </Heading>
      <Grid w="90%" mx="auto" templateColumns={{ base: "repeat(2, minmax(0, 1fr))", md: "repeat(4, minmax(0, 1fr))" }} autoColumns="auto">
        {listOfPromo.map((x, index) => {
          return (
            <GridItem key={index}>
              <Link to={`/search/results/${x.asin}/${x.price.value}`}>
                <Box bg="white" m={2} borderWidth="1px" borderRadius="lg" overflow="hidden">
                  <Image mx="auto" p="20px" h="200px" objectFit="contain" src={x.image} />
                  <Box p="6">
                    <Box display="flex" alignItems="baseline">
                      <Badge borderRadius="full" px="2" colorScheme="teal">
                        {props.tag}
                      </Badge>
                    </Box>
                    <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" noOfLines={3}>
                      {x.title}
                    </Box>
                    <Box pt="4px">
                      {x.price.value}
                      <Box as="span" color="gray.600" fontSize="sm">
                        {x.price.symbol}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Link>
            </GridItem>
          );
        })}{" "}
      </Grid>
    </>
  );
}
