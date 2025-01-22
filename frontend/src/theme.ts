import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
};

const theme = extendTheme({
  config,
  styles: {
    global: {
      body: {
        backgroundColor: "#FFF5CD",
      },
    },
  },
});

export default theme;
