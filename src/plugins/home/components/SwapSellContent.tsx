"use client";
import { MainButton } from "@/components/button/MainButton";
import { TSizes } from "@/utils/themes/custom-theme/sizes";
import theme from "@/utils/themes/mui-theme";
import { Box, InputBase, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { IconChevronDown } from "@tabler/icons-react";
import { useState } from "react";
import { TokenListModal } from "./TokenListModal";

export type ITypeSwap = "sell" | "buy";

interface IProps {
  type: ITypeSwap;
}

export const SwapContent = ({ type }: IProps) => {
  const [openTokenList, setOpenTokenList] = useState(false);

  const handleToggleModalTokenList = () => {
    setOpenTokenList(!openTokenList);
  };

  return (
    <>
      <Content>
        <Stack>
          <Typography color={theme.palette.grey[600]}>Sell</Typography>

          <InputBase placeholder="0" />
          <Typography color={theme.palette.grey[600]}>$7,135.57 </Typography>
        </Stack>

        <Box flexShrink={0}>
          <MainButton
            variant="contained"
            color="secondary"
            endIcon={<IconChevronDown size={"1.2rem"} />}
            size="small"
            fullRounded
            onClick={handleToggleModalTokenList}
          >
            Select token
          </MainButton>
        </Box>
      </Content>

      {openTokenList && (
        <TokenListModal
          open={openTokenList}
          onClose={handleToggleModalTokenList}
        />
      )}
    </>
  );
};

const Content = styled(Box)(({ theme }) => ({
  borderRadius: TSizes.borderRadiusMd,
  border: `1px solid ${theme.palette.grey[100]}`,
  backgroundColor: theme.palette.common.white,
  padding: theme.spacing(2),
  display: "flex",
  alignItems: "center",

  "&:hover": {
    borderColor: theme.palette.grey[200],
  },

  "& .MuiInputBase-input": {
    fontSize: "24px",
    fontWeight: 600,
  },
}));
