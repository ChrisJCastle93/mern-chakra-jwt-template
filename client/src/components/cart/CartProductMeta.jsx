import * as React from "react";

import { Box, Image, Stack, Text, Center } from "@chakra-ui/react";

export const CartProductMeta = (props) => {
  const { image, name, description } = props;

  return (
    <Stack direction="row" spacing="5" width="full">
      <Image rounded="lg" width={100} height={100} fit="cover" src={image} alt={name} draggable="false" loading="lazy" />
      <Box h={100}>
        <Center h={100}>
          <Stack spacing="0.5">
            <Text fontWeight="medium" px={4}>
              {name}
            </Text>
            <Text color="gray.600" fontSize="sm">
              {description}
            </Text>
          </Stack>
        </Center>
      </Box>
    </Stack>
  );
};
