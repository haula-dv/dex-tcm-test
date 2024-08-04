import { TSizes } from "@/utils/themes/custom-theme/sizes";
import { Box, InputBase, styled } from "@mui/material";
import IconSearch from "../icons/search";

export const SearchField = () => {
  return (
    <CustomSearchField>
      <IconSearch />
      <Box ml={1} />
      <InputBase placeholder="Search..." />
    </CustomSearchField>
  );
};

const CustomSearchField = styled(Box)(({ theme }) => ({
  height: TSizes.fieldSearchHeight,
  backgroundColor: theme.palette.grey[100],
  borderRadius: TSizes.borderRadius,
  border: `1px solid ${theme.palette.grey[200]}`,
  display: "flex",
  alignItems: "center",
  padding: "10px",
}));
