import { SimpleGrid, Text } from "@chakra-ui/react";
import Question from "../entities/Question";
import useQuestions from "../hooks/useQuestions";
import CardSkeleton from "./CardSkeleton";
import QuestionCard from "./QuestionCard";

interface Props {
  quizId: string;
}

const QuestionsGrid = ({ quizId }: Props) => {
  const { data: questions, isLoading, error } = useQuestions(quizId);

  const skeletonCount = 10;
  const skeletons = Array.from(
    { length: skeletonCount },
    (_, index) => index + 1
  );

  if (error) return <Text>{error.message}</Text>;

  return (
    <>
      <SimpleGrid
        padding={10}
        columns={{ sm: 1, md: 1, lg: 2, xl: 2, "2xl": 3 }}
        spacing={6}
        alignItems="stretch"
      >
        {isLoading && skeletons.map(() => <CardSkeleton height="200px" />)}
        {questions &&
          questions.map((question: Question) => (
            <QuestionCard
              key={question.id}
              questionId={question.id}
              text={question.text}
            />
          ))}
      </SimpleGrid>
    </>
  );
};

export default QuestionsGrid;
