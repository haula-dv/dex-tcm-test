import { setColorThemeMode } from "@/utils/helpers";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { ReactNode } from "react";

interface IItemRow {
  title: string | ReactNode;
  value: string | ReactNode;
}

export const ItemRow = ({ title, value }: IItemRow) => {
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      {typeof title == "string" ? (
        <Typography
          fontSize={{ xs: "12px", md: "14px" }}
          color={setColorThemeMode(
            useTheme().palette.grey[500],
            useTheme().palette.grey[200]
          )}
        >
          {title}
        </Typography>
      ) : (
        <Box
          color={setColorThemeMode(
            useTheme().palette.grey[500],
            useTheme().palette.grey[200]
          )}
        >
          {title}
        </Box>
      )}

      {typeof value == "string" ? (
        <Typography fontSize={{ xs: "12px", md: "14px" }} fontWeight={600}>
          {value}
        </Typography>
      ) : (
        <Box>{value}</Box>
      )}
    </Stack>
  );
};
