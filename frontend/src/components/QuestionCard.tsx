import { Card, CardBody, CardHeader, Text } from "@chakra-ui/react";

interface Props {
  title: string;
  text: string;
}

const QuestionCard = ({ title, text }: Props) => {
  return (
    <Card
      bg="#FFF0B5"
      border="1px"
      shadow="xl"
      _hover={{ bg: "#F9E9A9" }}
      width="450px"
      minHeight="200px"
    >
      <CardHeader>
        <Text
          fontFamily="monospace"
          fontWeight="bold"
          fontSize="xl"
          color="teal.600"
        >
          {title}
        </Text>
      </CardHeader>
      <CardBody paddingTop={0}>
        <Text fontFamily="monospace" fontSize="lg" color="teal.600">
          {text}
        </Text>
      </CardBody>
    </Card>
  );
};

export default QuestionCard;
