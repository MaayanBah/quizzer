import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  HStack,
  Image,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import cancelImage from "../assets/cancel.svg";
import flipImage from "../assets/Flip.svg";
import useDeleteQuestion from "../hooks/useDeleteQuestion";
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

  const [flipped, setFlipped] = useState(false);
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
    <Box width="450px" height="200px" style={{ perspective: "1000px" }}>
      <Box
        width="100%"
        height="100%"
        position="relative"
        transform={flipped ? "rotateY(180deg)" : "rotateY(0deg)"}
        transition="transform 0.6s"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front Side */}
        <Card
          bg="#FFF0B5"
          border="1px"
          shadow="xl"
          _hover={{ bg: "#F9E9A9" }}
          width="100%"
          height="100%"
          position="absolute"
          style={{ backfaceVisibility: "hidden" }}
        >
          <CardBody paddingTop={0}>
            <HStack justifyContent="flex-end" marginTop={5}>
              <Button
                onClick={() => deleteMutation.mutate(questionId)}
                padding="0px"
                borderRadius="full"
                _hover={{ bg: "#FCF0C1" }}
                _active={{ bg: "#F0E09E" }}
                width="auto"
                height="auto"
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
          <CardFooter display="flex" justifyContent="center" marginTop="10px">
            <Button
              onClick={() => setFlipped(!flipped)}
              padding="0px"
              borderRadius="full"
              _hover={{ bg: "#FCF0C1" }}
              _active={{ bg: "#F0E09E" }}
              width="auto"
              height="auto"
            >
              <Image src={flipImage} width="40px" height="40px" />
            </Button>
          </CardFooter>
        </Card>

        {/* Back Side */}
        <Card
          bg="#B7DFC4"
          border="1px"
          shadow="xl"
          width="100%"
          height="100%"
          position="absolute"
          style={{ backfaceVisibility: "hidden" }}
          transform="rotateY(180deg)"
        >
          <CardBody paddingTop={0}>
            <HStack justifyContent="flex-end" marginTop={5}>
              <Button
                onClick={() => deleteMutation.mutate(questionId)}
                padding="0px"
                borderRadius="full"
                _hover={{ bg: "#FCF0C1" }}
                _active={{ bg: "#F0E09E" }}
                width="auto"
                height="auto"
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
          <CardFooter display="flex" justifyContent="center" marginTop="10px">
            <Button
              onClick={() => setFlipped(!flipped)}
              padding="0px"
              borderRadius="full"
              _hover={{ bg: "#FCF0C1" }}
              _active={{ bg: "#F0E09E" }}
              width="auto"
              height="auto"
            >
              <Image src={flipImage} width="40px" height="40px" />
            </Button>
          </CardFooter>
        </Card>
      </Box>
    </Box>
  );
};

export default QuestionCard;
