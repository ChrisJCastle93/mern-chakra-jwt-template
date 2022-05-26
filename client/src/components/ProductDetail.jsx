import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { cartService } from "../services/localStorage.js";
import { Box, chakra, Container, Stack, Text, Image, Flex, VStack, Button, Heading, SimpleGrid, StackDivider, Spinner, useColorModeValue, VisuallyHidden, UnorderedList, List, ListItem } from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaYoutube, FaHeart } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import { Promos } from "../components/productdetails/Promos";

function ProductDetail() {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isWishListed, setIsWishListed] = useState(false);
  const params = useParams();
  const productId = params.id;
  const priceParam = params.price;
  const navigate = useNavigate();

  const resetCart = () => {
    cartService.addToLocalStorage("cart", []);
  };

  const addToCart = (product) => {
    const cart = cartService.getFromLocalStorage("cart");

    let newCart = [...cart];

    // let cartPrice = 10;
    // if (product.price) {
    //   cartPrice = product.price.value;
    // }

    const cartProduct = {
      id: product.asin,
      name: product.title,
      price: priceParam,
      // price: product.variants[0].price.value,
      // image: product.variants[0].main_image,
      image: product.main_image.link,
      quantity: 1,
    };

    let cartUpdated;

    newCart.map((item) => {
      if (item.id == cartProduct.id) {
        console.log("PRODUCT ALREADY IN CART");
        console.log("INCREASING QTY");
        item.quantity++;
        console.log(item.quantity);
        cartService.addToLocalStorage("cart", newCart);
        cartUpdated = true;
      }
    });

    if (!cartUpdated) {
      console.log("LOOKS LIKE A NEW PRODUCT, ADDING TO CART");
      newCart.push(cartProduct);
      cartService.addToLocalStorage("cart", newCart);
    }

    navigate("/cart");
  };

  const addToWishlist = (product) => {
    const wishlist = cartService.getFromLocalStorage("wishlist");

    if (!wishlist) {
      cartService.addToLocalStorage("wishlist", []);
    }
    let newWishlist = [...wishlist];

    const wishlistProduct = {
      id: product.asin,
      name: product.title,
      price: priceParam,
      image: product.main_image.link,
      quantity: 1,
    };

    newWishlist.push(wishlistProduct);

    cartService.addToLocalStorage("wishlist", newWishlist);

    console.log("wishlist cliicked");

    setIsWishListed((s) => !s);

    navigate("/profile");
  };

  useEffect(() => {
    console.log("USING EFFECT");
    const wishlist = cartService.getFromLocalStorage("wishlist");
    const cart = cartService.getFromLocalStorage("cart");
    if (!wishlist || !cart) {
      cartService.addToLocalStorage("wishlist", []);
      cartService.addToLocalStorage("cart", []);
    }
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/search/results/${productId}`)
      .then((response) => {
        console.log("API RESPONSE FROM SEARCH");
        setIsLoading(false);
        setProduct(response.data.product);
      })
      .catch((err) => console.log(err));
  }, [productId]);

  console.log(product);

  return (
    <Container maxW={"7xl"}>
      {isLoading ? (
        <Flex justify="center" direction="column" height="60vh" align="center">
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="teal" size="xl" />
          <Text color="gray.200" fontSize={"lg"} fontWeight={"300"} my={4}>
            Calling Amazon API
          </Text>
        </Flex>
      ) : (
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 8, md: 10 }} py={{ base: 6, md: 12 }}>
          <Flex>
            <Image rounded={"md"} alt={"product image"} src={product.main_image.link} fit={"cover"} align={"center"} w={"100%"} h={{ base: "100%", sm: "400px", lg: "500px" }} />
          </Flex>
          <Stack spacing={{ base: 6, md: 6 }}>
            <Box as={"header"}>
              <Heading lineHeight={1.1} fontWeight={600} fontSize={{ base: "xl", sm: "2xl", lg: "3xl" }}>
                {product.title}
              </Heading>
              <Text color="gray.900" fontWeight={800} my={8} fontSize={"3xl"}>
                {priceParam} $
              </Text>
            </Box>

            <Stack direction={"column"}>
              <VStack>
                {product.description ? (
                  <Text color="gray.500" fontSize={"xl"} fontWeight={"300"}>
                    {product.description}
                  </Text>
                ) : (
                  <></>
                )}
              </VStack>
              <Box>
                <Text fontSize={{ base: "16px", lg: "18px" }} color="teal" fontWeight={"500"} my={"8"}>
                  Features
                </Text>

                <SimpleGrid mb={4} columns={{ base: 1, md: 1 }} spacing={10}>
                  <UnorderedList spacing={2}>
                    {product.feature_bullets.map((feature, index) => {
                      return (
                        <ListItem color="gray.500" fontWeight={"300"} key={index}>
                          {feature}
                        </ListItem>
                      );
                    })}
                  </UnorderedList>
                </SimpleGrid>
              </Box>
            </Stack>

            <Button
              onClick={() => addToCart(product)}
              rounded={"lg"}
              w={"full"}
              mt={8}
              size={"lg"}
              py={"7"}
              // bg="gray.900"
              // bg="teal"
              colorScheme="teal"
              textTransform={"uppercase"}
              _hover={{
                transform: "translateY(2px)",
                boxShadow: "lg",
              }}
            >
              Add to cart
            </Button>
            {isWishListed ? (
              <Button
                onClick={() => addToWishlist(product)}
                rounded={"lg"}
                w={"full"}
                mt={0}
                size={"lg"}
                py={"7"}
                bg="gray.300"
                color="gray.400"
                textTransform={"uppercase"}
                _hover={{
                  transform: "translateY(2px)",
                  boxShadow: "lg",
                }}
              >
                <FaHeart size={24} style={{ margin: "10px", fill: "red" }} /> WishListed
              </Button>
            ) : (
              <Button
                onClick={() => addToWishlist(product)}
                rounded={"lg"}
                w={"full"}
                mt={0}
                size={"md"}
                py={"7"}
                bg="gray.100"
                color="gray.500"
                textTransform={"uppercase"}
                _hover={{
                  transform: "translateY(2px)",
                  boxShadow: "lg",
                }}
              >
                <FaHeart size={16} style={{ margin: "10px", fill: "gray" }} /> Add to WishList
              </Button>
            )}
            <Promos />
            {/* <Button onClick={() => resetCart()}>Reset Cart </Button> */}
            {/* <Stack direction="row" alignItems="center" justifyContent={"center"}>
              <MdLocalShipping />
              <Text>2-3 business days delivery</Text>
            </Stack> */}
          </Stack>
        </SimpleGrid>
      )}
    </Container>
  );
}

export default ProductDetail;
