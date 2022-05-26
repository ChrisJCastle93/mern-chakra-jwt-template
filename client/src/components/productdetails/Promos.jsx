import { HStack, Icon, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import * as React from "react";
import { BiCheckShield, BiPackage } from "react-icons/bi";
import { Ri24HoursLine } from "react-icons/ri";

const promose = [
  {
    icon: BiPackage,
    text: "Free shipping + returns",
  },
  {
    icon: BiCheckShield,
    text: "2 year extended warranty",
  },
  {
    icon: Ri24HoursLine,
    text: "We’re here for you 24/7",
  },
];

export const Promos = (props) => {
  const color = useColorModeValue("gray.600", "gray.300");
  return (
    <Stack borderRadius="md" borderWidth={2} spacing="4" p="6" bg='white' {...props}>
      {promose.map((promo, id) => (
        <HStack key={id} spacing="3" color={color}>
          <Icon as={promo.icon} fontSize="xl" />
          <Text>{promo.text}</Text>
        </HStack>
      ))}
    </Stack>
  );
};
