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

export const Login = (props) => {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (e) => {
    console.log("SUBMITTING");
    const res = await apiService.login(e.username, e.password);
    console.log("RECEIVED RESPONSE");
    console.log(res);

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
        console.log('navving to profile')
        navigate("/profile");
      }
    }
  };

  return (
    <>
      {/* <div className="auth-container">
        <div className="auth-div">
          <h1>Welcome back</h1>
          <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            <label className="label" htmlFor="login">
              Username:
            </label>
            <input
              className="input"
              {...register("username", {
                required: "Please enter a valid username",
              })}
              placeholder="Username"
              name="username"
            />
            <p>{errors.username?.message}</p>

            <label className="label" htmlFor="password">
              Password:
            </label>
            <input
              type="password"
              {...register("password", {
                required: "This is required",
                minLength: {
                  value: 8,
                  message: "Password must be over 8 characters",
                },
              })}
              placeholder="enter a password"
              name="password"
            />
            <p>{errors.password?.message}</p>
            <button className="btn" type="submit">
              Login
            </button>
          </form>
          <div className="auth-nav-div">
            <h3 className="auth-head">Don't have an account?</h3>
            <NavLink to="/signup" className="auth-btn-2">
              Sign up
            </NavLink>
          </div>
        </div>
        <div>
          <img className="auth-img" src={authLamp} alt="lamp-setting" />
        </div>
      </div> */}

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
            base: "white",
            sm: "white",
          })}
          boxShadow={{
            base: "none",
            sm: "xl",
          }}
          borderRadius={{
            base: "none",
            sm: "xl",
          }}
        >
          <Stack spacing="8">
            <Stack spacing="6" align="center">
              <Logo />
              <Stack spacing="3" textAlign="center">
                <Heading size="lg">Login.</Heading>
              </Stack>
            </Stack>
            <Stack spacing="6">
              <Divider />
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
                    />
                    {errors.username ? <FormHelperText my={2}>{errors.username.message}</FormHelperText> : <></>}
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
                      type="password"
                      placeholder="Password"
                      autoComplete="current-password"
                    />
                    {errors.password ? <FormHelperText my={2}>{errors.password.message}</FormHelperText> : <></>}
                    <Button mt={4} type="submit" colorScheme="teal" w="full">
                      Login
                    </Button>
                  </FormControl>
                </form>
              </Stack>
              <Link to="/signup">
                <Stack spacing="0.5" align="center">
                  <Button variant="link" colorScheme="teal" size="sm">
                    Create an account
                  </Button>
                </Stack>
              </Link>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </>
  );
};
