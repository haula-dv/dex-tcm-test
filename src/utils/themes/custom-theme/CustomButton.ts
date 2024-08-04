import { Theme } from "@mui/material";

export const CustomMuiButton = (theme: Theme) => {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          boxShadow: "none",
          fontSize: "14px",
          height: "40px",
          fontWeight: 700,

          "&.Mui-disabled": {
            pointerEvents: "all",
            cursor: "not-allowed !important",
            backgroundColor: theme.palette.grey[100],
            color: theme.palette.grey[300],
            "&:hover": {
              backgroundColor: theme.palette.grey[100],
            },
          },
        },

        contained: {
          //   padding: "8px 16px",
        },

        containedPrimary: {
          backgroundColor: theme.palette.primary.main,
          "&:hover": {
            backgroundColor: theme.palette.primary.main,
            color: "white",
          },
        },

        // SECONDARY
        containedSecondary: {
          backgroundColor: theme.palette.secondary.main,
          "&:hover": {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.secondary.dark,
          },
        },

        // DARK PRIMARY
        containedDarkPrimary: {
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          },
        },

        filledTonal: {
          //   padding: "8px 16px",
        },

        filledTonalInherit: {
          backgroundColor: theme.palette.grey[100],
          "&:hover": {
            backgroundColor: theme.palette.grey[200],
          },
        },

        // SIZE
        sizeSmall: {
          padding: "4px 12px",
          fontSize: "12px",
          height: "32px",
        },

        sizeLarge: {
          height: "56px",
        },

        text: {
          padding: "8px 16px",
        },

        textLink: {
          minWidth: "auto",
          height: "auto",
          padding: "0px !important",
          fontWeight: "600",
          "&:hover": {
            backgroundColor: "transparent",
          },
        },

        textLinkPrimary: {
          color: theme.palette.primary.main,
        },

        textPrimary: {
          // backgroundColor: theme.palette.primary.light,

          "&:hover": {
            // backgroundColor: theme.palette.primary.main,
            // color: "white",
          },
        },

        textSecondary: {
          backgroundColor: theme.palette.secondary.light,
          "&:hover": {
            backgroundColor: theme.palette.secondary.main,
            color: "white",
          },
        },

        textSuccess: {
          backgroundColor: theme.palette.success.light,
          "&:hover": {
            backgroundColor: theme.palette.success.main,
            color: "white",
          },
        },

        textError: {
          backgroundColor: theme.palette.error.light,
          "&:hover": {
            backgroundColor: theme.palette.error.main,
            color: "white",
          },
        },

        textInfo: {
          backgroundColor: theme.palette.info.light,
          "&:hover": {
            backgroundColor: theme.palette.info.main,
            color: "white",
          },
        },

        textWarning: {
          backgroundColor: theme.palette.warning.light,
          "&:hover": {
            backgroundColor: theme.palette.warning.main,
            color: "white",
          },
        },

        outlinedPrimary: {
          "&:hover": {
            backgroundColor: theme.palette.primary.main,
            color: "white",
          },
        },

        outlinedSecondary: {
          "&:hover": {
            backgroundColor: theme.palette.secondary.main,
            color: "white",
          },
        },

        outlinedError: {
          "&:hover": {
            backgroundColor: theme.palette.error.main,
            color: "white",
          },
        },

        outlinedSuccess: {
          "&:hover": {
            backgroundColor: theme.palette.success.main,
            color: "white",
          },
        },

        outlinedInfo: {
          "&:hover": {
            backgroundColor: theme.palette.info.main,
            color: "white",
          },
        },

        outlinedWarning: {
          "&:hover": {
            backgroundColor: theme.palette.warning.main,
            color: "white",
          },
        },
      },
    },
  };
};
