import { Box, List, ListItem } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useDeleteQuestion from "../hooks/useDeleteQuestion";
import useEditQuestion from "../hooks/useEditQuestion";
import useAnswers from "../hooks/useAnswers";
import EditableText from "./EditableText";
import Answer from "../entities/Answer";
import FlippableCardSide from "./FlippableCardSide";

interface Props {
  questionId: string;
  text: string;
}

const QuestionCard = ({ questionId, text }: Props) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const deleteMutation = useDeleteQuestion(id!);
  const { mutate: editQuestion, error } = useEditQuestion(id!);
  const { data: answers } = useAnswers(id!, questionId);

  const [flipped, setFlipped] = useState(false);
  const [componentText, setComponentText] = useState<string>(text);
  const [height, setHeight] = useState("auto");

  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);

  const updateHeight = () => {
    const activeSide = flipped ? backRef.current : frontRef.current;
    if (activeSide) {
      setHeight(`${activeSide.clientHeight}px`);
    }
  };

  useEffect(() => {
    updateHeight();
  }, [flipped, answers, text]);

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
    <Box
      width="450px"
      minHeight={height}
      transition="min-height 0.3s ease-in-out"
      style={{ perspective: "1000px" }}
    >
      <Box
        width="100%"
        minHeight={height}
        position="relative"
        transform={flipped ? "rotateY(180deg)" : "rotateY(0deg)"}
        transition="transform 0.6s, min-height 0.3s ease-in-out"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front Side */}
        <FlippableCardSide
          refProp={frontRef}
          bgColor="#FFF0B5"
          isFlipped={false}
          handleFlip={() => setFlipped(!flipped)}
          handleDelete={() => deleteMutation.mutate(questionId)}
        >
          <EditableText
            onChange={(e) => setComponentText(e.target.value)}
            handleEdit={handleEdit}
            text={componentText}
            fontSize="xl"
          />
        </FlippableCardSide>

        {/* Back Side */}
        <FlippableCardSide
          refProp={backRef}
          bgColor="#B7DFC4"
          isFlipped={true}
          handleFlip={() => setFlipped(!flipped)}
          handleDelete={() => deleteMutation.mutate(questionId)}
        >
          <List>
            {answers &&
              answers.map((answer: Answer) => (
                <ListItem key={answer.id}>{answer.text}</ListItem>
              ))}
          </List>
        </FlippableCardSide>
      </Box>
    </Box>
  );
};

export default QuestionCard;
