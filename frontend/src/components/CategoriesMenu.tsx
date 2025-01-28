import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import useCategories from "../hooks/useCtegories";
import { useNavigate } from "react-router-dom";

interface Props {
  selectedCategory: number | null;
  onSelected: (category: number) => void;
  visibleTooltip?: boolean;
}

const CategoriesMenu = ({
  selectedCategory,
  onSelected,
  visibleTooltip = false,
}: Props) => {
  const { data: categories, isLoading, error } = useCategories();
  const navigate = useNavigate();

  if (error?.response?.status === 401) {
    alert("Unauthorized! Redirecting to login.");
    localStorage.removeItem("access_token");
    navigate("/login");
  }

  return (
    <>
      {isLoading && <Spinner color="teal.500" />}
      {error && (
        <Text color="red.500" fontFamily="mono">
          Failed to load categories.
        </Text>
      )}
      {categories && (
        <Box marginTop={5}>
          <Tooltip
            label="Please select a category"
            isOpen={visibleTooltip}
            placement="top"
            hasArrow
            bg="#403E3E"
            color="white"
          >
            <Box>
              <Menu>
                <MenuButton
                  as={Button}
                  variant="light"
                  fontFamily="mono"
                  width="360px"
                >
                  {categories?.find(
                    (category) => category.id === selectedCategory
                  )?.name || "Select a category"}
                </MenuButton>
                <MenuList
                  bg="teal.600"
                  borderRadius="md"
                  maxHeight="200px"
                  overflowY="scroll"
                  w="360px"
                  __css={{
                    "&::-webkit-scrollbar": {
                      w: "2",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      borderRadius: "10",
                      bg: `gray.400`,
                    },
                  }}
                >
                  {categories.map((category) => (
                    <MenuItem
                      key={category.id}
                      onClick={() => onSelected(category.id)}
                      bg="teal.600"
                      color="#FFF5C9"
                      _hover={{ bg: "#FFF5C9", color: "teal.600" }}
                      justifyContent="center"
                    >
                      {category.name}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </Box>
          </Tooltip>
        </Box>
      )}
    </>
  );
};

export default CategoriesMenu;
