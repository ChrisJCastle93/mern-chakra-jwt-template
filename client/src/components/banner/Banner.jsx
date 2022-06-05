import * as React from "react";
import { FiInfo } from "react-icons/fi";
import { Box, Container, Icon, Square, Stack, Text, useBreakpointValue } from "@chakra-ui/react";

export const Banner = (props) => {
  const { message, status } = props;

  const bgColor = status === "success" ? "green.100" : "red.100";

  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  });

  return (
    <Container position="absolute" height="fit-content" as="section">
      <Box
        bg={bgColor}
        color="on-accent"
        px={{
          base: "4",
          md: "3",
        }}
        position="relative"
        borderRadius="xl"
      >
        <Stack
          direction={{
            base: "column",
            sm: "row",
          }}
          justify="space-between"
          spacing={{
            base: "1",
            md: "1",
          }}
          pb="0.5"
        >
          <Stack
            spacing="4"
            direction={{
              base: "column",
              md: "row",
            }}
            align={{
              base: "start",
              md: "center",
            }}
          >
            {!isMobile && (
              <Square size="8" bg="bg-accent-subtle" borderRadius="md">
                <Icon as={FiInfo} boxSize="4" />
              </Square>
            )}
            <Stack
              direction={{
                base: "column",
                md: "row",
              }}
              spacing={{
                base: "0.5",
                md: "1.5",
              }}
              pe={{
                base: "4",
                sm: "0",
              }}
            >
              <Text fontWeight="medium" textAlign="center" fontSize="xs">
                {message}
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
};
