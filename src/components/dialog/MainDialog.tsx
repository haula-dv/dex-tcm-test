import { TSizes } from "@/utils/themes/custom-theme/sizes";
import { Box, Dialog, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { IconX } from "@tabler/icons-react";
import { ReactNode } from "react";
import { MainIconButton } from "../button/MainIconButton";

interface IProps {
  children?: ReactNode;
  title?: string;
  handleClose: () => void;
  open: boolean;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false;
  disablePadding?: boolean;
  isBGWhite?: boolean;
  hiddenHeader?: boolean;
  isFullwidth?: boolean;
}

export const MainDialog = ({
  children,
  title,
  handleClose,
  open,
  maxWidth,
  disablePadding,
  isBGWhite,
  hiddenHeader,
  isFullwidth = true,
}: IProps) => {
  return (
    <CustomDialog
      onClose={handleClose}
      open={open}
      maxWidth={maxWidth}
      fullWidth={isFullwidth}
      role="dialog"
      aria-modal="true"
      isBGWhite={isBGWhite}
    >
      {!hiddenHeader && (
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          py={TSizes.margin_xs}
          pr={TSizes.margin_xs}
          pl={TSizes.margin_base}
        >
          <Typography fontWeight={700} fontSize={"16px"}>
            {title}
          </Typography>

          <MainIconButton
            isFullRounded
            onClick={handleClose}
            color="inherit"
            size="small"
          >
            <IconX size={"1.4rem"} />
          </MainIconButton>
        </Stack>
      )}

      <Box p={disablePadding ? 0 : TSizes.margin_base}>{children}</Box>
    </CustomDialog>
  );
};

interface ICustomDialog {
  isBGWhite?: boolean;
}

const CustomDialog = styled(Dialog, {
  shouldForwardProp: (prop) => prop !== "isBGWhite",
})<ICustomDialog>(({ theme, isBGWhite }) => ({
  zIndex: 9,
  "& .MuiDialog-paper": {
    position: "relative",
    boxShadow: "none",
    backgroundColor: isBGWhite ? "#fff" : theme.palette.grey[50],
    // width: "100%",
    margin: "16px",
  },
}));
