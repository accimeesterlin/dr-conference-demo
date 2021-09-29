import { extendTheme } from "@chakra-ui/react";

const _theme = extendTheme({
  fonts: {
    body: "IBM Plex Sans, sans-serif",
    heading: "IBM Plex Sans, sans-serif",
    mono: "Menlo, monospace",
  },
  colors: {
    brand: {
      bg: "#F8F8F8",
      green: "#16D898",
      darkgreen: "#00A26D",
      lightGray: "#B3B3C6",
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "normal",
      },
    },
  },
});

export default _theme;
