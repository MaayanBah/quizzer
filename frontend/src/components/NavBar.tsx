import { Box, HStack, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import LoginDropMenu from "./loginDropMenu";

const NavBar = () => {
  return (
    <Box background="#3F8D85" width="100%" padding="5px" boxSizing="border-box">
      <HStack padding="10px" justifyContent="space-between">
        <Link to={"/"}>
          <Image src={logo} width={16} />
        </Link>
        <LoginDropMenu />
      </HStack>
    </Box>
  );
};

export default NavBar;
