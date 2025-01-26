import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import useCategories from "../hooks/useCtegories";

const CategoriesMenu = () => {
  const { data: categories, isLoading, error } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <>
      {isLoading && <Spinner color="teal.500" />}
      {error && (
        <Text color="red.500" fontFamily="mono">
          Failed to load categories.
        </Text>
      )}
      {categories && (
        <Menu>
          <MenuButton
            as={Button}
            variant="light"
            fontFamily="mono"
            width="100%"
          >
            {selectedCategory || "Choose a category"}
          </MenuButton>
          <MenuList bg="teal.600" borderRadius="md">
            {categories.map((category) => (
              <MenuItem
                key={category.id}
                onClick={() => setSelectedCategory(category.slug)}
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
      )}
    </>
  );
};

export default CategoriesMenu;
