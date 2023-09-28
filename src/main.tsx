import React from "react";
import ReactDOM from "react-dom/client";
import { Router } from "./router";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./theme";
import { MicrophoneProvider } from "./contexts/MicrophoneContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <MicrophoneProvider>
        <Router />
      </MicrophoneProvider>
    </ChakraProvider>
  </React.StrictMode>
);
