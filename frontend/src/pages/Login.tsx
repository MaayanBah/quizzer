import {
  Button,
  Card,
  CardBody,
  FormControl,
  Text,
  VStack,
} from "@chakra-ui/react";
import CustomInput from "../components/CustomInput";
import { useState } from "react";
import useLogin from "../hooks/useLogin";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const loginMutation = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ username, password });
  };

  return (
    <VStack
      marginTop={30}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Card bg="teal.500" width="400px" boxShadow="dark-lg" borderRadius="md">
        <CardBody>
          <form onSubmit={handleSubmit}>
            <FormControl
              isRequired
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <CustomInput
                id="username-input"
                onChange={(text) => setUsername(text)}
                placeHolder="Username"
                autoComplete="Username"
              />
              <CustomInput
                id="password-input"
                onChange={(text) => setPassword(text)}
                isPassword={true}
                placeHolder="Password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                isLoading={loginMutation.isLoading}
                marginTop={1}
                variant="light"
                boxShadow="lg"
                width="100%"
              >
                Login
              </Button>
            </FormControl>
          </form>
        </CardBody>
      </Card>
      <Link to="/signup">
        <Text marginTop="5px" color="teal.800">
          Create an account
        </Text>
      </Link>
    </VStack>
  );
};

export default Login;
