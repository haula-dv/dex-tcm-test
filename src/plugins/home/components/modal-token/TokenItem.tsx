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
}

export const TokenItem = ({ isImportToken, ...props }: IProps) => {
  return (
    <CustomListItem {...props}>
      <ListItemIcon>
        <Box>
          <Image
            src={
              "https://coin-images.coingecko.com/coins/images/12645/large/aave-token-round.png?1720472354"
            }
            height={30}
            width={30}
            alt=""
          />
        </Box>
      </ListItemIcon>

      <ListItemText primary="0x Protocol" secondary="ZRX" />

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
