import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Stack, Heading, Flex, HStack, Text } from "@chakra-ui/react";
import { CartItem } from "../../components/cart/CartItem";
import { CartOrderSummary } from "../../components/cart/CartOrderSummary";
import axios from "axios";
import { cartService } from "../../services/localStorage";

export default function Cart(props) {
  let [cartData, setCartData] = useState([]);

  const onChangeQuantity = (value) => {
    const idToFilter = value.getAttribute("data-id");

    const copiedCart = [...cartData];
    // eslint-disable-next-line eqeqeq
    copiedCart.find((x) => x.id == idToFilter).quantity = value.value;

    setCartData(copiedCart);

    cartService.addToLocalStorage("cart", copiedCart);
  };

  const onClickDelete = (value) => {
    const copiedCart = [...cartData];

    const updatedCart = copiedCart.filter((x) => x.id !== value);

    setCartData(updatedCart);

    cartService.addToLocalStorage("cart", updatedCart);
  };

  const handleSubmit = async (e, userId) => {
    e.preventDefault();

    let totalPrice = 0;

    cartData.forEach((item) => {
      const itemTotal = item.price * item.quantity;
      totalPrice += itemTotal;
    });

    try {
      const orderId = await axios.post(`${process.env.REACT_APP_API_URL}/api/order/new`, { cartData, userId });

      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/payments/create-checkout-session`, { cartTotal: totalPrice.toFixed(2), id: orderId.data._id });

      window.location.href = res.data.url;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const cart = cartService.getFromLocalStorage("cart");
    setCartData(cart);
  }, []);

  return (
    <div>
      <Box
        maxW={{
          base: "3xl",
          lg: "7xl",
        }}
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
        <Stack
          direction={{
            base: "column",
            lg: "row",
          }}
          align={{
            lg: "flex-start",
          }}
          spacing={{
            base: "8",
            md: "16",
          }}
        >
          <Stack
            spacing={{
              base: "8",
              md: "10",
            }}
            flex="2"
          >
            <Heading fontSize="2xl" fontWeight="extrabold">
              Shopping Cart ({cartData.length} items)
            </Heading>

            <Stack spacing="6">
              {cartData.map((item) => (
                <CartItem key={item.id} {...item} onClickDelete={onClickDelete} onChangeQuantity={onChangeQuantity} isCart/>
              ))}
            </Stack>
          </Stack>

          <Flex direction="column" align="center" flex="1">
            <CartOrderSummary cartData={cartData} {...props} handleSubmit={handleSubmit} />
            <HStack mt="6" fontWeight="semibold">
              <Text>or</Text>
              <Link to="/">
                <Text color="teal">Continue Shopping</Text>
              </Link>
            </HStack>
          </Flex>
        </Stack>
      </Box>
    </div>
  );
}
