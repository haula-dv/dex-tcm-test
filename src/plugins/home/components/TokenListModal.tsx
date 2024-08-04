import { MainDialog } from "@/components/dialog/MainDialog";
import { SearchField } from "@/components/form-control/SearchField";
import { TSizes } from "@/utils/themes/custom-theme/sizes";
import theme from "@/utils/themes/mui-theme";
import {
  Box,
  Button,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";

interface IProps {
  open: boolean;
  onClose: () => void;
  handleSelectToken: (token: any) => void;
}

export const TokenListModal = ({
  open,
  onClose,
  handleSelectToken,
}: IProps) => {
  return (
    <MainDialog
      open={open}
      handleClose={onClose}
      title="Select a token"
      maxWidth="xs"
      disablePadding
      isBGWhite
    >
      <Stack px={TSizes.margin_base}>
        <SearchField />

        <Box display={"flex"} flexWrap={"wrap"} gap={1.5} py={2}>
          {[...Array(6)].map((item, index) => (
            <Token
              key={index}
              variant="outlined"
              color="inherit"
              onClick={() =>
                handleSelectToken({
                  name: `Token ${index + 1}`,
                  symbol: `TKN${index + 1}`,
                  image: `/images/token.png`,
                })
              }
            >
              <Image src={"/images/token.png"} height={24} width={24} alt="" />

              <Typography fontSize={"14px"} pl={0.5} pr={0.5}>
                ETH
              </Typography>
            </Token>
          ))}
        </Box>
      </Stack>

      <Divider />

      <Box maxHeight={"50vh"} overflow={"auto"}>
        <Typography
          fontWeight={600}
          color={theme.palette.grey[600]}
          px={TSizes.margin_base}
          pt={TSizes.margin_base}
          pb={1}
        >
          Popular tokens
        </Typography>

        <List>
          {[...Array(20)].map((item, index) => (
            <CustomListItem key={index} selected={index == 0}>
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
            </CustomListItem>
          ))}
        </List>
      </Box>
    </MainDialog>
  );
};

const Token = styled(Button)(({ theme }) => ({
  padding: "4px",
  minHeight: "auto",
  height: "auto",
  minWidth: "auto",
  borderRadius: "40px",
  borderColor: theme.palette.grey[200],
}));

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
