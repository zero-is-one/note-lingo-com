import React from "react";
import ReactDOM from "react-dom/client";
import { Router } from "./router";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./theme";
import { MicrophoneProvider } from "./contexts/MicrophoneContext";

// Prevent the screen from going to sleep
import NoSleep from "@marsgames/nosleep.js";
const noSleep = new NoSleep();
document.addEventListener(
  "click",
  function enableNoSleep() {
    document.removeEventListener("click", enableNoSleep, false);
    noSleep.enable();
  },
  false
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <MicrophoneProvider>
        <Router />
      </MicrophoneProvider>
    </ChakraProvider>
  </React.StrictMode>
);
