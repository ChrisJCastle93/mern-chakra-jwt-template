import { BrowserRouter } from "react-router-dom";
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import ReactDOM from "react-dom/client";
import theme from './theme/index.js'

let root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
