import IconAvatar from "@/components/icons/avatar";
import baselightTheme from "@/utils/themes/custom-theme/DefaultColors";
import { TSizes } from "@/utils/themes/custom-theme/sizes";
import theme from "@/utils/themes/mui-theme";
import { Box, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { IconCheck } from "@tabler/icons-react";

interface IProps {
  isSelected: boolean;
  handleSelectAccount: (index: number) => void;
  index: number;
}

export const AccountItem = ({
  isSelected,
  handleSelectAccount,
  index,
}: IProps) => {
  return (
    <CustomItem onClick={() => handleSelectAccount(index)}>
      <Stack direction={"row"} alignItems={"center"}>
        <IconAvatar />

        <Stack pl={TSizes.margin_xs}>
          <Typography
            fontSize={"18px"}
            fontWeight={400}
            color={baselightTheme.grey.A240}
          >
            Queen Bee
          </Typography>
          <Typography
            fontSize={"16px"}
            fontWeight={400}
            color={theme.palette.grey[400]}
          >
            bc1q87...34pm
          </Typography>
        </Stack>
      </Stack>

      {isSelected && <IconCheck color={theme.palette.success.main} />}
    </CustomItem>
  );
};

const CustomItem = styled(Box)(({ theme }) => ({
  padding: "12px 16px",
  display: "flex",
  alignItems: "center",
  backgroundColor: theme.palette.common.white,
  borderRadius: TSizes.borderRadius,
  cursor: "pointer",
  justifyContent: "space-between",
  "&:hover": {},
}));
