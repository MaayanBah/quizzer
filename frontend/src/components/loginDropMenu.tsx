import {
  Box,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import knownUserLight from "../assets/knownUserLight.png";
import unknownUserLight from "../assets/unknownUserLight.svg";
import useTokenStore from "../state-management/token/store";

const LoginDropMenu = () => {
  const token = localStorage.getItem("access_token");
  const { clearToken } = useTokenStore();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    clearToken();
    window.location.href = "/login";
  };

  return (
    <Menu>
      {token ? (
        <MenuButton as={Box} aria-label="Options">
          <Image
            src={token ? knownUserLight : unknownUserLight}
            alt="User Icon"
            width={12}
          />
        </MenuButton>
      ) : (
        <Link to="/login">
          <MenuButton as={Box} aria-label="Options">
            <Image
              src={token ? knownUserLight : unknownUserLight}
              alt="User Icon"
              width={12}
            />
          </MenuButton>
        </Link>
      )}
      {token && (
        <MenuList>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
          <Link to={"/my-quizzes"}>
            <MenuItem>My Quizzes</MenuItem>
          </Link>
          <Link to={"/create-quiz"}>
            <MenuItem>Create Quiz</MenuItem>
          </Link>
        </MenuList>
      )}
    </Menu>
  );
};

export default LoginDropMenu;
