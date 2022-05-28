// React
import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Services
import { cartService } from "../../services/localStorage";

// Components
import { Promos } from "../../components/productdetails/Promos";

// Packages
import axios from "axios";
import { Box, Container, Stack, Text, Image, Flex, VStack, Button, Heading, SimpleGrid, Spinner, UnorderedList, ListItem } from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";

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

    const cartProduct = {
      id: product.asin,
      name: product.title,
      price: priceParam,
      image: product.main_image.link,
      quantity: 1,
    };

    let cartUpdated;

    newCart.map((item) => {
      if (item.id == cartProduct.id) {
        item.quantity++;
        cartService.addToLocalStorage("cart", newCart);
        cartUpdated = true;
      }
    });

    if (!cartUpdated) {
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

    setIsWishListed((s) => !s);

    navigate("/profile");
  };

  useEffect(() => {
    const wishlist = cartService.getFromLocalStorage("wishlist");
    const cart = cartService.getFromLocalStorage("cart");
    if (!wishlist || !cart) {
      cartService.addToLocalStorage("wishlist", []);
      cartService.addToLocalStorage("cart", []);
    }
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/search/results/${productId}`)
      .then((response) => {
        setIsLoading(false);
        setProduct(response.data.product);
      })
      .catch((err) => console.log(err));
  }, [productId]);

  return (
    <Container px={8} maxW={"7xl"}>
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
