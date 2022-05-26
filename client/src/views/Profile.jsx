import React, { useState, useEffect } from "react";
import { CartItem } from "../components/cart/CartItem";
import { cartService } from "../services/localStorage";
import { Box, Button, Divider, Badge, Heading, Text, useColorModeValue, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer } from "@chakra-ui/react";
import { HiPencilAlt } from "react-icons/hi";
import { CardContent } from "../components/userprofile/CardContent";
import { CardWithAvatar } from "../components/userprofile/CardWithAvatar";
import { UserInfo } from "../components/userprofile/UserInfo";
import axios from "axios";

export default function Profile(props) {
  const wishlist = cartService.getFromLocalStorage("wishlist");
  const [wishlistData, setWishlist] = useState(wishlist);
  const [orderHistory, setOrderHistory] = useState([]);

  const onClickDelete = (value) => {
    const copiedWishlist = [...wishlistData];
    const updatedWishlist = copiedWishlist.filter((x) => x.id !== value);
    setWishlist(updatedWishlist);
    cartService.addToLocalStorage("wishlist", updatedWishlist);
  };

  useEffect(() => {
    setWishlist(wishlist);
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/order`, props.loggedInUser._id)
      .then((res) => {
        setOrderHistory(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(wishlistData);

  return (
    <>
      <Box height="max-content" as="section" position="relative">
        <Box inset="0" height="48" bg="teal" />
        <CardWithAvatar
          mt={-10}
          maxW="7xl"
          avatarProps={{
            src: "https://images.unsplash.com/photo-1485178575877-1a13bf489dfe?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDV8fHdvbWFufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
          }}
        >
          <CardContent w="100%">
            <Heading size="lg" fontWeight="extrabold" letterSpacing="tight">
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
                        <Tr>
                          <Td>
                            <Text align="left" fontSize="xs" fontWeight="light" key={index}>
                              {order._id}
                            </Text>
                          </Td>
                          <Td >
                            {" "}
                            <Text align="left" fontSize="xs" fontWeight="light" key={index}>
                              {order.products.map((product, index) => {
                                return (
                                  <>
                                    <Text noOfLines={0} fontSize="xs">
                                      <Text isTruncated as="span" fontWeight="medium" fontSize="xs">
                                        Qty: {product.quantity} - 
                                      </Text>
                                      {` ${product.name.substring(0, 30)}...  `}
                                    </Text>
                                  </>
                                );
                              })}
                            </Text>
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
            {wishlistData ?
              wishlistData?.map((item) => {
                return <CartItem align="left" key={item.id} {...item} onClickDelete={onClickDelete} isWishList noQuantity />;
              }
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
