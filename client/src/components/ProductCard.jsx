import { AspectRatio, Box, Button, HStack, Spacer, Image, Flex, Skeleton, Stack, Text, useBreakpointValue, useColorModeValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import * as React from "react";
import { Rating } from "../components/Rating";
import { PriceTag } from "../components/cart/PriceTag";

export const ProductCard = (props) => {
  const { product, rootProps } = props;
  const { title, image, price, rating, ratings_total } = product;
  return (
    <Stack
      border="1px"
      borderRadius="md"
      p={4}
      borderColor="gray.200"
      spacing={useBreakpointValue({
        base: "4",
        md: "5",
      })}
      {...rootProps}
    >
      <Link to={`/search/results/${product.asin}/${price.value}`}>
        <Box position="relative">
          <AspectRatio ratio={4 / 3}>
            <Image
              src={image}
              alt={title}
              objectFit="contain"
              draggable="false"
              fallback={<Skeleton />}
              borderRadius={useBreakpointValue({
                base: "md",
                md: "xl",
              })}
            />
          </AspectRatio>
        </Box>
        <Stack my={4}>
          <PriceTag price={price.value} currency={price.currency} />
          <HStack>
            <Rating defaultValue={rating} size="sm" />
            <Text fontSize="xs" isTruncated color={useColorModeValue("gray.600", "gray.400")}>
              {ratings_total} Reviews
            </Text>
          </HStack>
          <Box flex="1">
            <Text my={4} fontSize="xs" noOfLines={4} fontWeight="medium" color={useColorModeValue("gray.700", "gray.400")}>
              {title}
            </Text>
          </Box>
        </Stack>
      </Link>
    </Stack>
  );
};
