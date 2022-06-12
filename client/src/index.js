import { BrowserRouter } from "react-router-dom";
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import ReactDOM from "react-dom/client";
import theme from "./theme/index.js";
import { GoogleOAuthProvider } from "@react-oauth/google";

let root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLECLIENT}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GoogleOAuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);
