import { Box, Button, Image, Spinner, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import addImage from "../assets/add.svg";
import EditableText from "../components/EditableText";
import QuestionsGrid from "../components/QuestionsGrid";
import useAddQuestion from "../hooks/useAddQuestion";
import useEditQuiz from "../hooks/useEditQuiz";
import useQuiz from "../hooks/useQuiz";

const UserQuizPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: quiz, isLoading, error } = useQuiz(id!);
  const { mutate: editQuiz } = useEditQuiz();
  const { mutate: addQuestion } = useAddQuestion(id!);

  const [title, setTitle] = useState<string>(quiz?.title || "");
  const [description, setDescription] = useState<string>(
    quiz?.description || ""
  );

  if (error?.response?.status == 401) {
    alert("Unauthorized! Redirecting to login.");
    localStorage.removeItem("access_token");
    navigate("/login");
  }

  useEffect(() => {
    if (quiz) {
      setTitle(quiz.title);
      setDescription(quiz.description);
    }
  }, [quiz]);

  const handleEdit = () => {
    editQuiz(
      {
        id: id!,
        data: { title, description },
      },
      {
        onError: () => {
          if (error?.response?.status == 401) {
            alert("Unauthorized! Redirecting to login.");
            localStorage.removeItem("access_token");
            navigate("/login");
          }
          alert("Failed to update quiz.");
        },
      }
    );
  };

  const handleAddQuestion = () => {
    addQuestion(
      {
        title: "New Question",
        text: "Write your question here!",
      },
      {
        onError: () => {
          if (error?.response?.status == 401) {
            alert("Unauthorized! Redirecting to login.");
            localStorage.removeItem("access_token");
            navigate("/login");
          }
          alert("Failed to update quiz.");
        },
      }
    );
  };

  if (!quiz) {
    return null;
  }

  return (
    <VStack>
      <Box marginTop={5}>
        {isLoading && <Spinner color="teal.600" />}
        <EditableText
          text={title}
          onChange={(e) => setTitle(e.target.value)}
          handleEdit={handleEdit}
          fontSize={40}
        />
      </Box>
      <Box marginLeft={20}>
        <EditableText
          text={description}
          onChange={(e) => setDescription(e.target.value)}
          handleEdit={handleEdit}
          fontSize={20}
          isExpandable={true}
          expandableTextLength={50}
          inputWidth={600}
        />
      </Box>
      {id && <QuestionsGrid quizId={id} />}
      <Button marginTop="15px" onClick={handleAddQuestion}>
        <Image src={addImage} width="70px" />
      </Button>
    </VStack>
  );
};

export default UserQuizPage;
