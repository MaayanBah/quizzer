import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
};

const theme = extendTheme({
  config,
  components: {
    Button: {
      baseStyle: {
        borderRadius: "md", // Default border radius
        fontWeight: "bold", // Default font weight
      },
      variants: {
        light: {
          bg: "#FFF0B5",
          color: "teal.600",
          _hover: {
            bg: "#F0E09E",
            color: "teal.600",
          },
        },
        dark: {
          bg: "teal.800",
          color: "white",
          _hover: {
            bg: "teal.700",
            color: "white",
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
