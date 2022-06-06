import * as React from "react";
import { Link } from "react-router-dom";

import { AiOutlineUser, AiOutlineLogout } from "react-icons/ai";
import { Logo } from "../logo/Logo";
import { NavAction } from "./NavAction";

import { GoogleLogout } from "react-google-login";

import { Box, Flex, HStack, Button, useBreakpointValue } from "@chakra-ui/react";

const clientId = "707788443358-u05p46nssla3l8tmn58tpo9r5sommgks.apps.googleusercontent.com";

export const Navbar = (props) => {
  const { loggedInUser, logoutHandler } = props;
  const variant = useBreakpointValue({ base: false, md: true });

  const onSuccess = () => {
    logoutHandler();
  };

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
                <GoogleLogout
                  render={(renderProps) => (
                    <Button colorScheme="brand" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                      Logout
                    </Button>
                  )}
                  clientId={clientId}
                  buttonText="Logout"
                  onLogoutSuccess={onSuccess}
                ></GoogleLogout>
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
