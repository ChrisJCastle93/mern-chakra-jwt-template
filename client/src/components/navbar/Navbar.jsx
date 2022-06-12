import * as React from "react";
import { Link } from "react-router-dom";

import { AiOutlineUser } from "react-icons/ai";
import { Logo } from "../logo/Logo";
import { NavAction } from "./NavAction";

import { googleLogout } from "@react-oauth/google";

import { Box, Flex, HStack, Button, useBreakpointValue } from "@chakra-ui/react";

export const Navbar = (props) => {
  const { loggedInUser, logoutHandler } = props;
  const variant = useBreakpointValue({ base: false, md: true });

  const logout = () => {
    googleLogout();
    logoutHandler();
  };

  return (
    <Box w="90%" mx="auto" borderBottom="1px" borderColor="gray.100">
      {!variant ? (
        <Flex py={2} direction="column" align="center">
          <Flex justify="space-between" align="center" width="100%">
            <Link to="/">
              <Logo />
            </Link>
            {loggedInUser ? (
              <Button onClick={logout} colorScheme="brand">
                Logout
              </Button>
            ) : (
              <Link to="/login">
                <NavAction.Desktop label="Login" icon={AiOutlineUser} />
              </Link>
            )}
          </Flex>
        </Flex>
      ) : (
        <>
          <Flex py={4} justify="space-between" align="center" mx="auto">
            <Link px={4} to="/">
              <Logo />
            </Link>
            <HStack mx={4} justify="flex-end" flexShrink={0}>
              {loggedInUser ? (
                <Button onClick={logout} colorScheme="brand">
                  Logout
                </Button>
              ) : (
                <Link to="/login">
                  <NavAction.Desktop label="Login" icon={AiOutlineUser} />
                </Link>
              )}
            </HStack>
          </Flex>
        </>
      )}
    </Box>
  );
};
