import { Button, Card, CardBody, HStack, Image } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import cancelImage from "../assets/cancel.svg";
import useDeleteQuestion from "../hooks/useDelteQuestion";
import useEditQuestion from "../hooks/useEditQuestion";
import EditableText from "./EditableText";

interface Props {
  questionId: string;
  text: string;
}

const QuestionCard = ({ questionId, text }: Props) => {
  const { id } = useParams();
  const deleteMutation = useDeleteQuestion(id!);
  const { mutate: editQuestion, error } = useEditQuestion(id!);
  const navigate = useNavigate();
  const [componentText, setComponentText] = useState<string>(text);

  const handleEdit = () => {
    editQuestion(
      {
        id: questionId!,
        data: { text: componentText },
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

  return (
    <Card
      bg="#FFF0B5"
      border="1px"
      shadow="xl"
      _hover={{ bg: "#F9E9A9" }}
      width="450px"
      minHeight="200px"
    >
      <CardBody paddingTop={0}>
        <HStack justifyContent="flex-end">
          <Button
            onClick={() => deleteMutation.mutate(questionId)}
            padding="0px"
            borderRadius="full"
            _hover={{ bg: "#FCF0C1" }}
            _active={{ bg: "#F0E09E" }}
            width="auto"
            height="auto"
            paddingTop={5}
          >
            <Image src={cancelImage} width="40px" height="40px" />
          </Button>
        </HStack>
        <EditableText
          onChange={(e) => setComponentText(e.target.value)}
          handleEdit={handleEdit}
          text={componentText}
          fontSize="xl"
        />
      </CardBody>
    </Card>
  );
};

export default QuestionCard;
