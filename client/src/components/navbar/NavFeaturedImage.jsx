import { Box, Image, useColorModeValue as mode } from '@chakra-ui/react'
import * as React from 'react'

export const NavFeaturedImage = (props) => {
  const { label, href = '#', imageUrl, bottomOffset = '5', ...rest } = props
  return (
    <Box
      as="a"
      display="block"
      href={href}
      height="280px"
      width="full"
      position="relative"
      userSelect="none"
      {...rest}
    >
      <Image
        w="full"
        fit="cover"
        rounded="lg"
        alt={label}
        src={imageUrl}
        height="full"
        position="relative"
      />
      <Box
        whiteSpace="nowrap"
        textTransform="uppercase"
        fontWeight="semibold"
        fontSize="sm"
        px="3"
        py="0.5"
        rounded="sm"
        bg={mode('white', 'gray.600')}
        position="absolute"
        bottom={bottomOffset}
        left="50%"
        transform="auto"
        translateX="-50%"
      >
        {label}
      </Box>
    </Box>
  )
}
