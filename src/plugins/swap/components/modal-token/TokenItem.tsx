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
import { ITokenType } from "../../type";

interface IProps extends ListItemButtonProps {
  isImportToken?: boolean;
  item: ITokenType;
}

export const TokenItem = ({ isImportToken, item, ...props }: IProps) => {
  return (
    <CustomListItem {...props}>
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
