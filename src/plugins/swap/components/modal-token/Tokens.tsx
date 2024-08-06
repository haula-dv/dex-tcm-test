import { MainButton } from "@/components/button/MainButton";
import { SearchField } from "@/components/form-control/SearchField";
import { TSizes } from "@/utils/themes/custom-theme/sizes";
import theme from "@/utils/themes/mui-theme";
import { Box, Button, Divider, List, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { IconEdit } from "@tabler/icons-react";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { TokenItem } from "./TokenItem";
import { ITokenType } from "./TokenListModal";
interface IProps {
  handleSelectToken: (token: any) => void;
  setTokenType: Dispatch<SetStateAction<ITokenType>>;
}

export const Tokens = ({ handleSelectToken, setTokenType }: IProps) => {
  return (
    <>
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

      <Box height={"50vh"} overflow={"auto"} position={"relative"} pb={5}>
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
          <TokenItem
            isImportToken
            onClick={() => setTokenType("importToken")}
          />

          {[...Array(10)].map((item, index) => (
            <TokenItem key={index} />
          ))}
        </List>
      </Box>

      <ManageButton>
        <MainButton
          fullWidth
          startIcon={<IconEdit />}
          color="inherit"
          onClick={() => setTokenType("manageTokens")}
        >
          Manage
        </MainButton>
      </ManageButton>
    </>
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

const ManageButton = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  width: "100%",
  backgroundColor: "#fff",
  display: "flex",
  justifyContent: "center",
}));
