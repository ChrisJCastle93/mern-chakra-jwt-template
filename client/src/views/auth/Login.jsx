import React, { useState } from "react";

import authService from "../../services/auth";

import heroone from "../../assets/heroone.jpg";
import { Logo } from "../../components/logo/Logo";

import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { FormControl, FormLabel, FormHelperText, Box, Button, Container, Heading, Input, Stack, Text, useBreakpointValue } from "@chakra-ui/react";

export const Login = (props) => {

  // props

  const { setLoggedInUser } = props

  // state management

  const [errorMessage, setErrorMessage] = useState("");

  // variables

  const navigate = useNavigate();
  const variant = useBreakpointValue({ base: false, md: true });

  //react-hook-form

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // functions

  const onSubmit = async (data) => {
    const authResponse = await authService.login(data.username, data.password);

    if (authResponse.errorMessage) {
      setErrorMessage("Email or password is incorrect");
      setTimeout(() => {
        setErrorMessage("");
      }, 4000);
    } else {
      setLoggedInUser(authResponse);
      navigate("/");
    }
  };

  return (
    <>
      <Box
        bgImage={heroone}
        w="100%"
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
                <Heading size="lg">Login.</Heading>
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
                    <Button mt={4} type="submit" colorScheme="brand" w="full">
                      Login
                    </Button>
                  </FormControl>
                </form>
              </Stack>
              <Link to="/signup">
                <Stack spacing="0.5" align="center">
                  <Button variant="link" colorScheme="brand" size="sm">
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
