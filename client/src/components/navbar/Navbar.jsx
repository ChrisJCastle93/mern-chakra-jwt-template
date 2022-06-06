import * as React from "react";
import { Link } from "react-router-dom";

import { AiOutlineUser, AiOutlineLogout } from "react-icons/ai";
import { Logo } from "../logo/Logo";
import { NavAction } from "./NavAction";

import { Box, Flex, HStack, Button, useBreakpointValue } from "@chakra-ui/react";

export const Navbar = (props) => {
  const { loggedInUser } = props;
  const variant = useBreakpointValue({ base: false, md: true });

  return (
    <Box w="90%" mx="auto" borderBottom="1px" borderColor="gray.100">
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
            </Link>
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
                <Link to="#">
                  <Button onClick={props.logoutHandler}>
                    <NavAction.Desktop label="Logout" {...props} icon={AiOutlineLogout} />
                  </Button>
                </Link>
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
