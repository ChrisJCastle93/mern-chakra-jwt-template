import React, { useState, useEffect } from "react";

import { cartService } from "../../services/localStorage";
import axios from "axios";

import { CartItem } from "../../components/cart/CartItem";
import { CardContent } from "../../components/userprofile/CardContent";
import { CardWithAvatar } from "../../components/userprofile/CardWithAvatar";

import { Box, Divider, Badge, Heading, Text, Table, Thead, Tbody, Tr, Th, Td, TableContainer } from "@chakra-ui/react";

export default function Profile(props) {
  // local storage

  
  // state
  
  const [wishlistData, setWishlist] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  
  // functions
  
  const onClickDelete = (value) => {
    const copiedWishlist = [...wishlistData];
    const updatedWishlist = copiedWishlist.filter((x) => x.id !== value);
    setWishlist(updatedWishlist);
    cartService.addToLocalStorage("wishlist", updatedWishlist);
  };
  
  useEffect(() => {
    const wishlist = cartService.getFromLocalStorage("wishlist");
    setWishlist(wishlist);
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/order/${props.loggedInUser._id}`)
      .then((res) => {
        setOrderHistory(res.data);
      })
      .catch((err) => console.log(err));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box height="max-content" as="section" position="relative">
        <Box inset="0" height={{ base: 32, md: 48 }} bg="teal" />
        <CardWithAvatar
          mt={-10}
          maxW="7xl"
          avatarProps={{
            src: "https://images.unsplash.com/photo-1485178575877-1a13bf489dfe?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDV8fHdvbWFufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
          }}
        >
          <CardContent w="100%">
            <Heading textAlign="center" size="lg" my={4} fontWeight="extrabold" letterSpacing="tight">
              {props.loggedInUser.username}
            </Heading>
            <Heading size="md" align="left" fontWeight="bold" letterSpacing="tight">
              Order History
            </Heading>
            <Divider mb={8} />
            <TableContainer mb={8} p={0}>
              <Table m={0} p={0} variant="simple">
                <Thead>
                  <Tr>
                    <Th>Order Number</Th>
                    <Th>Products</Th>
                    <Th>Status</Th>
                    <Th>Order Date</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {orderHistory ? (
                    orderHistory.map((order, index) => {
                      return (
                        <Tr key={index}>
                          <Td>
                            <Text align="left" fontSize="xs" fontWeight="light" key={index}>
                              {order._id}
                            </Text>
                          </Td>
                          <Td>
                            {" "}
                            {order.products.map((product, index) => {
                              return (
                                <Text noOfLines={0} key={index} align="left" fontSize="xs" fontWeight="light">
                                  <Text noOfLines={1} as="span" fontWeight="medium" fontSize="xs">
                                    Qty: {product.quantity} -
                                  </Text>
                                  {` ${product.name.substring(0, 30)}...  `}
                                </Text>
                              );
                            })}
                          </Td>
                          <Td>{order.paid ? <Badge colorScheme="green">Paid</Badge> : <Badge colorScheme="red">Not Paid</Badge>}</Td>
                          <Td>
                            {" "}
                            <Text align="left" fontSize="xs" fontWeight="light" key={index}>
                              {Date(order.createdAt).substring(0, 15)}
                            </Text>
                          </Td>
                        </Tr>
                      );
                    })
                  ) : (
                    <Text align="left" fontSize="xs" fontWeight="light">
                      No orders.
                    </Text>
                  )}
                </Tbody>
              </Table>
            </TableContainer>
            <Heading size="md" align="left" fontWeight="bold" letterSpacing="tight">
              Wishlist
            </Heading>
            <Divider mb={8} />
            {wishlistData ? (
              wishlistData?.map((item, index) => {
                return <CartItem align="left" key={index} {...item} onClickDelete={onClickDelete} isWishList noQuantity />;
              })
            ) : (
              <Text align="left" fontSize="xs" fontWeight="light">
                No wishlist items yet.
              </Text>
            )}
          </CardContent>
        </CardWithAvatar>
      </Box>{" "}
    </>
  );
}
