import { Button, HStack, Image, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import doneImage from "../assets/done.svg";
import editImage from "../assets/edit.svg";
import ExpandableText from "./ExpandableText";

interface Props {
  text: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleEdit: () => void;
  fontSize: number | string;
  isExpandable?: boolean;
  expandableTextLength?: number;
  inputWidth?: number;
}

const EditableText = ({
  text,
  onChange,
  handleEdit,
  fontSize,
  isExpandable = false,
  expandableTextLength = 100,
  inputWidth = 300,
}: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {!isEditing ? (
        <HStack>
          {isExpandable ? (
            <ExpandableText children={text} length={expandableTextLength} />
          ) : (
            <Text fontFamily="mono" color="teal.600" fontSize={fontSize}>
              {text}
            </Text>
          )}

          <Button onClick={() => setIsEditing(true)}>
            <Image src={editImage} width="20px" />
          </Button>
        </HStack>
      ) : (
        <HStack>
          <Input
            value={text}
            onChange={(event) => onChange(event)}
            placeholder="Edit Text"
            fontFamily="mono"
            color="teal.600"
            fontSize={fontSize}
            border="1px"
            _hover={{ color: "teal.500" }}
            width={inputWidth}
          />
          <Button
            onClick={() => {
              handleEdit();
              setIsEditing(false);
            }}
          >
            <Image src={doneImage} width="40px" />
          </Button>
        </HStack>
      )}
    </>
  );
};

export default EditableText;
