import * as React from "react";
import { Link } from "react-router-dom";

import { AiOutlineUser, AiOutlineLogout } from "react-icons/ai";
import { RiShoppingCartLine } from "react-icons/ri";
import { Logo } from "./Logo";
import { CartCount } from "./CartCount";
import { NavAction } from "./NavAction";
import SearchContainer from "../search/SearchContainer";

import { Box, Flex, HStack, Button, useBreakpointValue } from "@chakra-ui/react";

export const NavbarOne = (props) => {
  const { loggedInUser } = props;
  const variant = useBreakpointValue({ base: false, md: true });

  return (
    <>
      <Box borderBottom="1px" borderColor="gray.100">
        {!variant ? (
          <Flex py={2} direction="column" align="center">
            <Flex justify="space-around" align="center" width="100%">
              {loggedInUser ? (
                <Link to="#">
                  <NavAction.Desktop label="Logout" {...props} icon={AiOutlineLogout} />
                </Link>
              ) : (
                <Link to="/login">
                  <NavAction.Desktop label="Login" icon={AiOutlineUser} />
                </Link>
              )}
              <Link to="/">
                <Logo />
              </Link>{" "}
              <Box position="relative">
                <Link to="/cart">
                  <NavAction.Desktop label="Cart" icon={RiShoppingCartLine} />
                  <CartCount>{props.cart.length}</CartCount>
                </Link>
              </Box>
            </Flex>
            <SearchContainer handleSearchResults={props.handleSearchResults} />
          </Flex>
        ) : (
          <>
            <Flex py={4} justify="space-between" align="center" mx="auto">
              <Link px={4} to="/">
                <Logo />
              </Link>
              <SearchContainer handleSearchResults={props.handleSearchResults} />
              <HStack mx={4} justify="flex-end" flexShrink={0}>
                {loggedInUser ? (
                  <Link to="#">
                    <Button onClick={props.logoutHandler}>
                      <NavAction.Desktop label="Logout" {...props} icon={AiOutlineLogout} />
                    </Button>
                  </Link>
                ) : (
                  <Link to="/login">
                    <NavAction.Desktop label="Sign in" icon={AiOutlineUser} />
                  </Link>
                )}
                <Box position="relative">
                  <Link to="/cart">
                    <NavAction.Desktop label="Cart" icon={RiShoppingCartLine} />
                    <CartCount>{props.cart.length}</CartCount>
                  </Link>
                </Box>
              </HStack>
            </Flex>
          </>
        )}
      </Box>
    </>
  );
};
