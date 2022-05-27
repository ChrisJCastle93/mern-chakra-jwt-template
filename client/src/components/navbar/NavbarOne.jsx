import { Box, Center, Flex, HStack, Text, Button, MenuDivider, Menu, MenuButton, MenuList, MenuGroup, MenuItem, useColorModeValue as mode, VisuallyHidden, useBreakpointValue } from "@chakra-ui/react";
import * as React from "react";
import { AiOutlineUser, AiOutlineLogout } from "react-icons/ai";
import { MdMenu } from "react-icons/md";
import { RiHeartLine, RiShoppingCartLine } from "react-icons/ri";
import { CurrencySelect } from "./CurrencySelect";
import { Logo } from "./Logo";
import { CartCount } from "./CartCount";
import { MobileBottomNav } from "./MobileBottomNav";
import { NavAction } from "./NavAction";
import { NavCategoryMenu } from "./NavCategoryMenu";
import { NavCategorySubmenu } from "./NavCategorySubmenu";
import { SearchInput } from "./SearchInput";
import { Link } from "react-router-dom";
import { cartService } from "../../services/localStorage";
// import SearchContainer from "../search1/SearchContainer"
import SearchContainer from "../search/SearchContainer";

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
