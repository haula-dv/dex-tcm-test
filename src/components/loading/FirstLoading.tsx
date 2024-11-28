"use client";
import { setColorThemeMode } from "@/utils/helpers";
import { Backdrop, Box, useTheme } from "@mui/material";
import IconLoading from "../icons/loading";
import Logo from "../icons/Logo";

export const FirstLoading = () => {
  const theme = useTheme();

  return (
    <Backdrop
      open={true}
      sx={{
        zIndex: 99999,
        bgcolor: setColorThemeMode(
          theme.palette.primary.main,
          theme.palette.grey[800]
        ),
      }}
    >
      <Box height={"80px"} position={"relative"}>
        <Box>
          <Logo />
          <IconLoading />
        </Box>
      </Box>
    </Backdrop>
  );
};
