import { Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import * as React from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "./PriceTag";

export const CartOrderSummary = (props) => {
  let { cartData, loggedInUser } = props;

  let totalPrice = 0;

  cartData.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    totalPrice += itemTotal;
  });

  const navigate = useNavigate()

  const loginRedirect = () => {
    props.loginToCheckout()
    navigate('/login')
  };

  return (
    <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" width="full">
      <Heading size="md">Order Summary</Heading>
      <Stack spacing="6">
        <Flex justify="space-between">
          <Text fontSize="lg" fontWeight="semibold">
            Total
          </Text>
          <Text fontSize="xl" fontWeight="extrabold">
            {formatPrice(totalPrice)}
          </Text>
        </Flex>
      </Stack>
      {/* <Text> Logged in User is: {loggedInUser._id} </Text> */}
      {loggedInUser ? (
        <Button onClick={(e) => props.handleSubmit(e, loggedInUser._id)} colorScheme="teal" size="lg" fontSize="md" rightIcon={<FaArrowRight />}>
          Checkout
        </Button>
      ) : (
        <Button onClick={loginRedirect} colorScheme="teal" size="lg" fontSize="md" rightIcon={<FaArrowRight />}>
          Login to Checkout
        </Button>
      )}
    </Stack>
  );
};
