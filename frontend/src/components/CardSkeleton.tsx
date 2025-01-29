import { Card, CardBody, Skeleton, SkeletonText } from "@chakra-ui/react";

interface Props {
  height: string;
}

const CardSkeleton = ({ height }: Props) => {
  return (
    <Card
      bg="#FFF0B5"
      border="1px"
      shadow="xl"
      _hover={{ bg: "#F9E9A9" }}
      width="450px"
      height="200px"
    >
      <Skeleton height={height} startColor="#FFF0B5" endColor="#FFEA91" />

      <CardBody>
        <SkeletonText startColor="teal.600" endColor="teal.500" />
      </CardBody>
    </Card>
  );
};

export default CardSkeleton;
