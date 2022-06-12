import React from "react";
import { useNavigate } from "react-router-dom";

import { useGoogleLogin } from "@react-oauth/google";

import authService from "../../services/auth";
import googleService from "../../services/googleAuth";
import { GoogleIcon } from "../google/GoogleIcon";

import { Flex, Button } from "@chakra-ui/react";

export default function LoginGoogle(props) {
  const { setLoggedInUser, setErrorMessage } = props;

  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {

      const { email, username } = await googleService.getProfileInfo(tokenResponse)

      const authResponse = await authService.googleAuth(email, username);

      if (authResponse.errorMessage) {
        setErrorMessage("Google Auth Failure");
        setTimeout(() => {
          setErrorMessage("");
        }, 4000);
      } else {
        setLoggedInUser(authResponse);
        navigate("/");
      }
    },
  });

  return (
    <Flex>
      <Button width="100%" variant="outline" onClick={() => login()} leftIcon={<GoogleIcon boxSize="5" />} iconSpacing="3">
        Continue with Google
      </Button>
    </Flex>
  );
}
