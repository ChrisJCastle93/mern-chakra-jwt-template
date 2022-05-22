import PromoContainer from "./PromoContainer";
import "../css/Home.css";
import { Box, Heading, Text } from "@chakra-ui/react";
import heroone from "../assets/heroone.jpg";

function Home(props) {
  return (
    <>
      <Box bgImage={heroone} bgSize="contain" bgRepeat="no-repeat">
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
