import {
  Button,
  Card,
  CardBody,
  FormControl,
  Text,
  VStack,
} from "@chakra-ui/react";
import CustomInput from "../components/CustomInput";

const Login = () => {
  return (
    <VStack
      marginTop={30}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Card
        bg="teal.500"
        height={200}
        width="400px"
        boxShadow="dark-lg"
        borderRadius="md"
      >
        <CardBody>
          <FormControl
            isRequired
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <CustomInput placeHolder="Username" />
            <CustomInput isPassword={true} placeHolder="Password" />
            <Button marginTop={1} variant="light" boxShadow="lg" width="100%">
              Login
            </Button>
          </FormControl>
        </CardBody>
      </Card>
      <Text marginTop="5px" color="teal.800">
        Create an account
      </Text>
    </VStack>
  );
};

export default Login;
