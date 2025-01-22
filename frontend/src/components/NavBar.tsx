import { Box, Button, HStack, Image } from "@chakra-ui/react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Box
      background="#3F8D85"
      width="100%"
      padding="10px"
      boxSizing="border-box"
    >
      <HStack padding="10px">
        <Link to={"/"}>
          <Image src={logo} width={16} />
        </Link>
        <Link to={"/"}>
          <Button variant="outline" size="sm">
            Home
          </Button>
        </Link>
        <Link to={"/login"}>
          <Button variant="outline" size="sm">
            Log In
          </Button>
        </Link>
        <Link to={"/my-quizzes"}>
          <Button variant="outline" size="sm">
            My Quizzes
          </Button>
        </Link>
      </HStack>
    </Box>
  );
};

export default NavBar;
