import {
  Button,
  Card,
  CardBody,
  FormControl,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import CustomInput from "../components/CustomInput";
import useLogin from "../hooks/useLogin";
import useSignup from "../hooks/useSignup";

const SignupPage = () => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const signUpMutation = useSignup();
  const loginMutation = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }
    setPasswordError("");

    signUpMutation.mutate(
      { first_name, last_name, email, username, password },
      {
        onSuccess: () => {
          loginMutation.mutate({ username, password });
        },
      }
    );
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
                onChange={(firstName) => setFirstName(firstName)}
                error={signUpMutation?.error?.response?.data.first_name?.join(
                  ", "
                )}
                id="first-name-input"
                placeHolder="First Name"
                autoComplete="given-name"
              />

              <CustomInput
                onChange={(lastName) => setLastName(lastName)}
                error={signUpMutation?.error?.response?.data.last_name?.join(
                  ", "
                )}
                id="last-name-input"
                placeHolder="Last Name"
                autoComplete="family-name"
              />
              <CustomInput
                onChange={(email) => setEmail(email)}
                error={signUpMutation?.error?.response?.data.email?.join(", ")}
                id="email-input"
                placeHolder="Email"
                autoComplete="email"
              />
              <CustomInput
                onChange={(userName) => setUsername(userName)}
                error={signUpMutation?.error?.response?.data.username?.join(
                  ", "
                )}
                id="username-input"
                placeHolder="Username"
                autoComplete="Username"
              />
              <CustomInput
                onChange={(password) => setPassword(password)}
                error={signUpMutation?.error?.response?.data.password?.join(
                  ", "
                )}
                id="password-input"
                isPassword={true}
                placeHolder="Password"
                autoComplete="current-password"
              />
              <CustomInput
                onChange={(password) => setConfirmPassword(password)}
                error={passwordError}
                id="password-repeat-input"
                isPassword={true}
                placeHolder="Confirm Password"
                autoComplete="current-password"
              />
              <Button
                isLoading={signUpMutation.isLoading}
                type="submit"
                marginTop={1}
                variant="light"
                boxShadow="lg"
                width="100%"
              >
                Signup
              </Button>
            </FormControl>
          </form>
        </CardBody>
      </Card>
      <Link to="/login">
        <Text marginTop="5px" color="teal.800">
          Already have an account? Login
        </Text>
      </Link>
    </VStack>
  );
};

export default SignupPage;
