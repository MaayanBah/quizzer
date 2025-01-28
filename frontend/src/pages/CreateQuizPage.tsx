import { Button, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";
import { useWindowSize } from "react-use";
import CategoriesMenu from "../components/CategoriesMenu";
import CustomInput from "../components/CustomInput";
import useCreateQuiz from "../hooks/useCreateQuiz";

const CreateQuizPage = () => {
  const { width, height } = useWindowSize();
  const [quizName, setQuizName] = useState("");
  const [quizDesc, setQuizDesc] = useState("");
  const [categoryTooltip, setCategoryTooltip] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const navigate = useNavigate();
  const createQuizMutation = useCreateQuiz();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory) {
      setCategoryTooltip(true);
      return;
    }
    createQuizMutation.mutate(
      { title: quizName, description: quizDesc, category: selectedCategory },
      {
        onSuccess: (data) => {
          setShowConfetti(true);
          setTimeout(() => {
            const quizId = data.id;
            navigate(`/my-quizzes/${quizId}`);
          }, 3000);
        },
        onError: (error) => {
          if (error.response?.status === 401) {
            alert("Unauthorized! Redirecting to login.");
            localStorage.removeItem("access_token");
            navigate("/login");
          } else {
            console.error("Failed to create quiz:", error);
            alert("Failed to create quiz. Please try again.");
          }
        },
      }
    );
  };

  return (
    <>
      {showConfetti && <Confetti width={width} height={height} />}
      <form onSubmit={handleSubmit}>
        <VStack paddingTop={6}>
          <Text fontFamily="mono" color="teal.600" fontSize={30}>
            Enter your quiz name:
          </Text>
          <CustomInput
            id="quiz-name"
            placeHolder="Quiz name"
            onChange={(name) => setQuizName(name)}
            autoComplete="quiz-name"
          />

          <Text fontFamily="mono" color="teal.600" fontSize={30}>
            Add a description:
          </Text>
          <CustomInput
            id="quiz-description"
            placeHolder="Description"
            onChange={(text) => setQuizDesc(text)}
            autoComplete="description"
          />
          <CategoriesMenu
            selectedCategory={selectedCategory}
            onSelected={(category) => setSelectedCategory(category)}
            visibleTooltip={categoryTooltip}
          />

          <Button
            marginTop="8"
            type="submit"
            variant="dark"
            boxShadow="lg"
            width="400px"
            height="50px"
            fontFamily="monospace"
          >
            Create a New Quiz!
          </Button>
        </VStack>
      </form>
    </>
  );
};

export default CreateQuizPage;
