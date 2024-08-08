import { ITokenType } from "@/common";
import { MainButton } from "@/components/button/MainButton";
import {
  Box,
  ListItemButton,
  ListItemButtonProps,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";

interface IProps extends ListItemButtonProps {
  isImportToken?: boolean;
  item: ITokenType;
  handleSelectToken: (token: ITokenType) => void;
}

export const TokenItem = ({
  isImportToken,
  handleSelectToken,
  item,
  ...props
}: IProps) => {
  return (
    <CustomListItem {...props} onClick={() => handleSelectToken(item)}>
      <ListItemIcon>
        <Box>
          <Image src={item.project.logoUrl} height={30} width={30} alt="" />
        </Box>
      </ListItemIcon>

      <ListItemText primary={item.name} secondary={item.symbol} />

      {isImportToken && (
        <MainButton size="small" variant="contained" color="darkPrimary">
          Import
        </MainButton>
      )}
    </CustomListItem>
  );
};

const CustomListItem = styled(ListItemButton)(({ theme }) => ({
  "& .MuiListItemText-primary": {
    fontSize: "16px",
  },

  "& .MuiListItemText-secondary": {
    fontSize: "12px",
    color: theme.palette.grey[700],
  },

  "& .MuiListItemIcon-root": {
    minWidth: "46px",
  },
}));
