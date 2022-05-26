import PromoContainer from "./PromoContainer";
import "../css/Home.css";
import { Box, Heading, Text, Flex } from "@chakra-ui/react";
import heroone from "../assets/heroone.jpg";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Banner } from "../components/banner/Banner";
import axios from 'axios'

function Home(props) {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  let { id } = useParams();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      axios.post(`${process.env.REACT_APP_API_URL}/api/order/${id}/paid`);
      setStatus("success");
      setMessage(`Order ${id} placed! You will receive an email confirmation.`);
      setTimeout(() => {
        setStatus("");
        setMessage("");
      }, 3000);
    }

    if (query.get("canceled")) {
      setStatus("failure");
      setMessage("Order canceled -- continue to shop around and checkout when you're ready.");
      setTimeout(() => {
        setStatus("");
        setMessage("");
      }, 3000);
    }
  }, []);

  return (
    <>
      {message ? (
        <Flex width="100%" justify="center">
          <Banner message={message} status={status} />
        </Flex>
      ) : (
        <></>
      )}
      <Box pb="40px" bgImage={heroone} bgSize="contain" bgRepeat="no-repeat">
        <Heading zIndex="2" mx="auto" lineHeight="1.2em" textAlign="center" py="80px" w="60%" size="2xl">
          Anything you want. <br /> You just need to{" "}
          <Text display="inline" bgGradient="linear(to-l, #55C3FD, #7CFFFE)" bgClip="text" size="2xl">
            Ask
          </Text>
          .
        </Heading>
        <PromoContainer zIndex="1" tag="Lamps" header="Bestselling lamps" queryString="q=designer+lamps" />
        <PromoContainer tag="Macbook" header="Back to school" queryString="q=macbook" />
        <PromoContainer tag="Sunglasses" header="Get ready for summer" queryString="q=sunglasses" />
        <PromoContainer tag="Plants" header="Live in nature" queryString="q=plant" />
      </Box>
    </>
  );
}

export default Home;
