import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  fonts: {
    // heading: `'Open Sans', sans-serif`,
    // body: `'Raleway', sans-serif`,
  },
  colors: {
    bellowPush: {
      "50": "#EFEBFA",
      "100": "#D3C6F0",
      "200": "#B7A2E7",
      "300": "#9A7DDD",
      "400": "#7E59D4",
      "500": "#6234CB",
      "600": "#4E2AA2",
      "700": "#3B1F7A",
      "800": "#271551",
      "900": "#140A29",
    },
    bellowPull: {
      "50": "#FFF0E5",
      "100": "#FFD4B8",
      "200": "#FFB98A",
      "300": "#FF9E5C",
      "400": "#FF822E",
      "500": "#FF6700",
      "600": "#CC5200",
      "700": "#993E00",
      "800": "#662900",
      "900": "#331500",
    },
  },
});
