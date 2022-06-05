import * as React from "react";
import { useNavigate } from "react-router-dom";

import { cartService } from "../../services/localStorage";

import { PriceTag } from "./PriceTag";
import { CartProductMeta } from "./CartProductMeta";

import { CloseButton, Button, Link, Flex, Select, useColorModeValue } from "@chakra-ui/react";

const QuantitySelect = (props) => {
  return (
    <Select maxW="64px" aria-label="Select quantity" focusBorderColor={useColorModeValue("blue.500", "blue.200")} {...props}>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
    </Select>
  );
};

export const CartItem = (props) => {
  // state
  const navigate = useNavigate();

  // props deconstruction
  const { name, description, quantity, image, currency, price, onChangeQuantity, onClickDelete, id, isWishList, isCart } = props;

  // cart service - local storage
  const addToCart = (product) => {
    const cart = cartService.getFromLocalStorage("cart");

    let newCart = [...cart];

    const cartProduct = {
      id,
      name,
      price,
      image,
      quantity,
    };

    let cartUpdated;

    newCart.forEach((item) => {
      // eslint-disable-next-line eqeqeq
      if (item.id == cartProduct.id) {
        cartUpdated = true;
      }
    });

    if (!cartUpdated) {
      newCart.push(cartProduct);
      cartService.addToLocalStorage("cart", newCart);
    }

    navigate("/cart");
  };

  return (
    <Flex
      direction={{
        base: "column",
        md: "row",
      }}
      justify="space-between"
      align="center"
    >
      <CartProductMeta name={name?.substring(0, 40) + "..."} description={description} image={image} id={id} />

      <Flex
        width="full"
        justify="space-between"
        display={{
          base: "none",
          md: "flex",
        }}
      >
        {isCart && (
          <QuantitySelect
            data-id={id}
            value={quantity}
            onChange={(e) => {
              onChangeQuantity(e.currentTarget);
            }}
          />
        )}

        {isWishList && (
          <Button colorScheme="teal" onClick={addToCart}>
            Add to Cart{" "}
          </Button>
        )}

        <PriceTag price={price} currency={currency} />
        <CloseButton aria-label={`Delete ${name} from cart`} onClick={() => onClickDelete(id)} />
      </Flex>

      {/* Mobile */}
      <Flex
        mt="4"
        align="center"
        width="full"
        justify="space-between"
        display={{
          base: "flex",
          md: "none",
        }}
      >
        <Link to="/" aria-label={`Delete ${name} from cart`} onClick={() => onClickDelete(id)}>
          Delete
        </Link>

        {isCart && (
          <QuantitySelect
            data-id={id}
            value={quantity}
            onChange={(e) => {
              onChangeQuantity(e.currentTarget);
            }}
          />
        )}

        {isWishList && (
          <Button colorScheme="teal" onClick={addToCart}>
            Add to Cart{" "}
          </Button>
        )}

        <PriceTag price={price} currency={currency} />
      </Flex>
    </Flex>
  );
};
