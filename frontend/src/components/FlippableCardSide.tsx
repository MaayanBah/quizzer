import {
  Button,
  Card,
  CardBody,
  CardFooter,
  HStack,
  Image,
} from "@chakra-ui/react";
import cancelImage from "../assets/cancel.svg";
import flipImage from "../assets/Flip.svg";

interface Props {
  refProp: React.RefObject<HTMLDivElement>;
  bgColor: string;
  isFlipped: boolean;
  handleFlip: () => void;
  handleDelete: () => void;
  children: React.ReactNode;
}

const FlippableCardSide = ({
  refProp,
  bgColor,
  isFlipped,
  handleFlip,
  handleDelete,
  children,
}: Props) => {
  return (
    <Card
      ref={refProp}
      bg={bgColor}
      border="1px"
      shadow="xl"
      width="100%"
      position="absolute"
      style={{ backfaceVisibility: "hidden" }}
      transform={isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"}
    >
      <CardBody paddingTop={0}>
        {/* Delete Button */}
        <HStack justifyContent="flex-end" marginTop={5}>
          <Button
            onClick={handleDelete}
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
        {children}
      </CardBody>

      <CardFooter display="flex" justifyContent="center" marginTop="10px">
        <Button
          onClick={handleFlip}
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
  );
};

export default FlippableCardSide;
