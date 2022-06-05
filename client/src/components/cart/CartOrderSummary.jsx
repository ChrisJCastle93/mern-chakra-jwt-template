import * as React from "react";
import { useNavigate } from "react-router-dom";

import { FaArrowRight } from "react-icons/fa";
import { formatPrice } from "./PriceTag";

import { Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";

export const CartOrderSummary = (props) => {
  // props deconstruction
  let { cartData, loggedInUser } = props;

  // establish variables
  let totalPrice = 0;

  cartData.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    totalPrice += itemTotal;
  });

  // router
  const navigate = useNavigate();

  // click handler
  const loginRedirect = () => {
    props.loginToCheckout();
    navigate("/login");
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
