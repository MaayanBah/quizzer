import {
  Box,
  Button,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface Props {
  isPassword?: boolean;
  formLabel?: string;
  placeHolder: string;
}

const CustomInput = ({ formLabel, placeHolder, isPassword = false }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  return (
    <Box marginBottom={2}>
      {formLabel && <FormLabel color="teal.500">{formLabel}</FormLabel>}
      <InputGroup>
        <Input
          boxShadow="lg"
          placeholder={placeHolder}
          focusBorderColor="teal.500"
          backgroundColor="whiteAlpha.900"
          _placeholder={{ color: "gray.500" }}
          _hover={{ backgroundColor: "gray.200" }}
          width="350px"
          height="45px"
          color="teal.600"
          border="1px"
          type={isPassword && !showPassword ? "password" : "text"}
        />
        {isPassword && (
          <InputRightElement>
            <Button
              onClick={togglePasswordVisibility}
              variant="link"
              h="1.75rem"
              size="sm"
              color="teal.600"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize="1.2rem" />
              ) : (
                <AiOutlineEye fontSize="1.2rem" />
              )}
            </Button>
          </InputRightElement>
        )}
      </InputGroup>
    </Box>
  );
};

export default CustomInput;
