import { Button, Text, VStack } from "@chakra-ui/react";
import CategoriesMenu from "../components/CategoriesMenu";
import CustomInput from "../components/CustomInput";

const CreateQuizPage = () => {
  return (
    <>
      <VStack paddingTop={6}>
        <form>
          <Text fontFamily="mono" color="teal.600" fontSize={30}>
            Enter your quiz name:
          </Text>
          <CustomInput
            id="quiz-name"
            placeHolder="Quiz name"
            autoComplete="quiz-name"
          />

          <Text fontFamily="mono" color="teal.600" fontSize={30}>
            Add a description:
          </Text>
          <CustomInput
            id="quiz-description"
            placeHolder="Description"
            autoComplete="description"
          />

          <Text fontFamily="mono" color="teal.600" fontSize={30}>
            Select a category:
          </Text>
          <CategoriesMenu />
          <Button
            marginTop={25}
            type="submit"
            variant="dark"
            boxShadow="lg"
            width="100%"
            fontFamily="monospace"
          >
            Create a New Quiz!
          </Button>
        </form>
      </VStack>
    </>
  );
};

export default CreateQuizPage;
