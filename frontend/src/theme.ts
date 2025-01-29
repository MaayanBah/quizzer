import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
};

const theme = extendTheme({
  config,
  breakpoints: {
    sm: "30em",
    md: "48em",
    lg: "62em",
    xl: "80em",
    "2xl": "96em",
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: "md",
        fontWeight: "bold",
      },
      variants: {
        light: {
          bg: "#FFF0B5",
          borderColor: "teal.500",
          borderWidth: "1px",
          color: "teal.600",
          _hover: {
            bg: "#F0E09E",
            color: "teal.600",
          },
        },
        dark: {
          bg: "teal.800",
          color: "#FFF5C9",
          _hover: {
            bg: "teal.700",
            color: "#FFF5C9",
          },
        },
      },
    },
  },

  styles: {
    global: {
      body: {
        backgroundColor: "#FFF5CD",
      },
    },
  },
});

export default theme;
