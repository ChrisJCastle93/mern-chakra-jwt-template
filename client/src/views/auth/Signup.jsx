import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import authService from "../../services/auth";

import { Logo } from "../../components/logo/Logo";
import heroone from "../../assets/heroone.jpg";

import { FormControl, FormLabel, FormHelperText, Box, Button, Container, Heading, Input, Stack, Text, useBreakpointValue } from "@chakra-ui/react";

export const Signup = (props) => {
  // props

  const { setLoggedInUser } = props;

  // state management

  const [errorMessage, setErrorMessage] = useState("");

  // variables

  const navigate = useNavigate();
  const variant = useBreakpointValue({ base: false, md: true });

  // react-hook-form

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // functions

  const onSubmit = async (data) => {
    const authResponse = await authService.signup(data.username, data.email, data.password);

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
        w="100%"
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
                    <Button mt={4} type="submit" colorScheme="brand" w="full">
                      Signup
                    </Button>
                  </FormControl>
                </form>
              </Stack>
              <Link to="/login">
                <Stack spacing="0.5" align="center">
                  <Button variant="link" colorScheme="brand" size="sm">
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
};
