import React, { useState } from "react";
import apiService from "../services/auth";
import { useForm } from "react-hook-form";
import { useNavigate, NavLink, Link } from "react-router-dom";
import authLamp from "../../assets/authLamp.png";
// import "../../css/authForm.css";
import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Box, Button, Container, Divider, Heading, Input, Stack, Text, useBreakpointValue, Flex, InputGroup } from "@chakra-ui/react";
import { Logo } from "../../components/navbar/Logo";
import heroone from "../../assets/heroone.jpg";
import { Banner } from "../../components/banner/Banner";

export const Signup = (props) => {
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const variant = useBreakpointValue({ base: false, md: true });

  const onSubmit = async (data) => {
    const res = await apiService.signup(data.username, data.email, data.password);
    props.setLoggedInUser(res);
    if (res.errorMessage) {
      setErrorMessage("Email or password is incorrect");
      setTimeout(() => {
        setErrorMessage("");
      }, 4000);
    } else {
      await props.setLoggedInUser(res);
      if (props.cameFromCheckout) {
        navigate("/cart");
      } else {
        navigate("/");
      }
    }
  };

  return (
    <>
      <Box
        bgImage={heroone}
        bgSize="cover"
        bgRepeat="no-repeat"
        py={{
          base: "6",
          md: "12",
        }}
      >
        <Container
          maxW="md"
          py={{
            base: "0",
            sm: "8",
          }}
          px={{
            base: "4",
            sm: "10",
          }}
          bg={useBreakpointValue({
            base: "none",
            md: "white",
          })}
          boxShadow={{
            base: "none",
            sm: "xl",
          }}
          borderRadius={{
            base: "md",
            sm: "md",
          }}
        >
          <Stack spacing="8">
            <Stack spacing="6" align="center">
              {variant ? <Logo /> : <Box></Box>}
              <Stack spacing="3" textAlign="center">
                <Heading size="lg">Signup.</Heading>
              </Stack>
            </Stack>
            <Stack spacing="6">
              <Stack spacing="4">
                {errorMessage && (
                  <Text align="center" bg="red.100" borderRadius="md" px={4} py={2}>
                    {errorMessage}
                  </Text>
                )}
                <form onSubmit={handleSubmit(onSubmit)}>
                  <FormControl isRequired>
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <Input
                      {...register("username", {
                        required: "Please enter a valid username",
                      })}
                      id="username"
                      type="text"
                      placeholder="Username"
                      autoComplete="username"
                      mt={1}
                      bg="white"
                    />
                    {errors.username ? <FormHelperText my={2}>{errors.username.message}</FormHelperText> : <></>}
                    <FormLabel mt={4} htmlFor="email">
                      Email
                    </FormLabel>
                    <Input {...register("email", { required: "Please enter a valid email" })} placeholder="Email" id="email" type="email" autoComplete="email" mt={1} bg="white" />
                    {errors.email ? <FormHelperText my={2}>{errors.email.message}</FormHelperText> : <></>}
                    <FormLabel mt={4} htmlFor="password">
                      Password
                    </FormLabel>
                    <Input
                      {...register("password", {
                        required: "Please enter your password",
                        minLength: {
                          value: 8,
                          message: "Password must be over 8 characters",
                        },
                      })}
                      id="password"
                      mt={1}
                      bg="white"
                      type="password"
                      placeholder="Password"
                      autoComplete="current-password"
                    />
                    {errors.password ? <FormHelperText my={2}>{errors.password.message}</FormHelperText> : <></>}
                    <Button mt={4} type="submit" colorScheme="teal" w="full">
                      Signup
                    </Button>
                  </FormControl>
                </form>
              </Stack>
              <Link to="/login">
                <Stack spacing="0.5" align="center">
                  <Button variant="link" colorScheme="teal" size="sm">
                    Already have an account
                  </Button>
                </Stack>
              </Link>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </>
  );
  // return (
  //   <container className="auth-container">
  //     <div className="auth-div">
  //       <h1 >Become a VIP,<p></p>it's hot</h1>
  //         <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
  //         <label className="label" for="signup">Username:</label>
  //           <input
  //             {...register("username", {
  //               required: "Please enter a valid username",
  //             })}
  //             placeholder="Username"
  //             name="username"
  //           />
  //           <p>{errors.username?.message}</p>

  //           <label className="label" for="email">Email:</label>
  //           <input type="email"
  //             {...register("email", { required: "Please enter a valid email" })}
  //             placeholder="Email"
  //             name="email"
  //           />
  //           <p>{errors.email?.message}</p>

  //           <label className="label" for="password">Password:</label>
  //           <input type="password"
  //             {...register("password", {
  //               required: "This is required",
  //               minLength: {
  //                 value: 8,
  //                 message: "Password must be over 8 characters",
  //               },
  //             })}
  //             placeholder="enter a password"
  //             name="password"
  //           />
  //           <p>{errors.password?.message}</p>
  //           <button className="btn" type="submit">Sign up</button>

  //         </form>
  //         <div className="auth-nav-div">
  //           <h3 className="auth-head">Already have an account?</h3>
  //           <NavLink to="/login" className="auth-btn-2">Log in</NavLink>
  //         </div>
  //       </div>
  //       <div >
  //         <img className="auth-img" src ={authLamp} alt="lamp-setting" />
  //       </div>

  //   </container>
  // );
};
