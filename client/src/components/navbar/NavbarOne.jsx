import { Box, Center, Flex, HStack, Text, useColorModeValue as mode, VisuallyHidden } from "@chakra-ui/react";
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

  return (
    <>
      <Flex
        direction="column"
        // pb="4.5rem"
        overflow="hidden"
        display={{
          base: "flex",
          lg: "none",
        }}
      >
        <Box px="4" py="4" borderBottomWidth="1px" overflow="auto">
          <Flex
            align="center"
            justify="space-between"
            mb="3"
            display={{
              base: "flex",
              lg: "none",
            }}
          >
            <HStack spacing="3">
              <Center w="8" h="8" as="button" type="button">
                <VisuallyHidden>Toggle Menu</VisuallyHidden>
                <Box as={MdMenu} fontSize="3xl" />
              </Center>
              <Logo />
            </HStack>
          </Flex>
          {/* <SearchInput /> */}
        </Box>
        {/* <SearchContainer handleSearchResults={props.handleSearchResults} /> */}
      </Flex>

      <Box
        display={{
          base: "none",
          lg: "block",
        }}
      >
        <Box px="8" bg={mode("white", "gray.800")}>
          <Flex height="6rem" align="center" maxW="8xl" mx="auto">
            <Link to="/">
              <Logo />
            </Link>
            <Box width="full" px="64">
              <SearchContainer handleSearchResults={props.handleSearchResults} />
              {/* <SearchInput handleSearchResults={props.handleSearchResults} /> */}
            </Box>
            <HStack spacing="8" flexShrink={0}>
              {/* <NavAction.Desktop label="Wishlist" href="" icon={RiHeartLine} /> */}
              {loggedInUser ? (
                // <Text>
                <Link to='#'>
                  <NavAction.Desktop label="Logout" {...props} icon={AiOutlineLogout} />
                </Link>
              ) : (
                // </Text>
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
        </Box>
      </Box>
    </>
  );
};
