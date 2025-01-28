import { Button, HStack, Text } from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  children: string;
  length?: number;
  textColor?: string;
}

const ExpandableText = ({
  children,
  length = 300,
  textColor = "teal.600",
}: Props) => {
  const [isExpended, setIsExpended] = useState(true);
  const onClick = () => {
    setIsExpended(!isExpended);
  };

  if (!children) return null;

  if (children.length <= length) {
    return <Text color={textColor}>{children}</Text>;
  }

  return (
    <>
      <Text color={textColor} textAlign="center" maxWidth={400}>
        {isExpended === true ? children.slice(0, length) + "..." : children}
      </Text>
      <Button
        onClick={onClick}
        size="sm"
        marginTop={2}
        marginLeft={1}
        variant="light"
      >
        {isExpended === true ? "More" : "less"}
      </Button>
    </>
  );
};

export default ExpandableText;
