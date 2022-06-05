import * as React from "react";

import { FaTwitter } from "react-icons/fa";
import { Logo } from "./Logo";

import { Flex, Container, IconButton, Stack, Text } from "@chakra-ui/react";

export const Footer = () => (
  <Container
    maxW="8xl"
    as="footer"
    role="contentinfo"
    py={{
      base: "6",
      md: "8",
    }}
  >
    <Stack
      spacing={{
        base: "4",
        md: "5",
      }}
    >
      <Stack justify="space-between" direction="row" align="center">
        <Logo />
        <Flex align="center">
          <IconButton as="span" bg="white" color="teal" aria-label="Twitter" icon={<FaTwitter />} />
          <Text fontSize="xs" color="gray.500" fontWeight="semibold" as="a" href="http://www.twitter.com/chrisjcastle">
            Chris Castle
          </Text>
        </Flex>
      </Stack>
    </Stack>
  </Container>
);
