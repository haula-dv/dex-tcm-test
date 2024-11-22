import { setColorThemeMode } from "@/utils/helpers";
import { TSizes } from "@/utils/themes/custom-theme/sizes";
import { Box, ListItem, Stack, Typography, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import { memo, ReactElement } from "react";

interface IProps {
  order: any;
}

const OrderHistoryItemMobile = ({ order }: IProps) => {
  //   const theme = useTheme();

  //   const [_, base, quote] = (order as any).symbol.split("_");

  //   const { baseDecimals, quoteDecimals } = getDecimals((order as any).symbol);
  console.log(order);
  return (
    <Item disablePadding>
      {/* <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        width={"100%"}
        pt={"10px"}
        px={"10px"}
      >
        <Stack direction={"row"} spacing={"6px"}>
          <Chip
            color="success"
            variant="filledTonal"
            label={(order as any).side}
            size="small"
          />
          <Typography fontSize={"12px"}>{base}-PERP</Typography>
        </Stack>

        <Typography fontSize={"12px"}>
          {(order as any).status == "NEW" ? "Pending" : (order as any).status}
        </Typography>
      </Stack>

      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        width={"100%"}
        px={"10px"}
        pt="6px"
        pb={"10px"}
      >
        <Chip variant="filledTonal" size="small" label="Limit" color="info" />

        <Typography fontSize={"12px"} sx={{ opacity: "0.4" }}>
          2024-11-21 07:21:11
        </Typography>
      </Stack>

      <Box borderTop={1} width={"100%"} borderColor={theme.palette.divider} />

      <Grid container p={"10px"} rowSpacing={"6px"}>
        <Grid item xs={4}>
          <ItemCol
            label="Qty"
            value={
              <Typography fontSize={"12px"} color={theme.palette.success.main}>
                {formatQty((order as any).quantity, baseDecimals)}
              </Typography>
            }
          />
        </Grid>
        <Grid item xs={4}>
          <ItemCol label="Filled" value="0.0000" />
        </Grid>

        <Grid item xs={4}>
          <ItemCol label="Trigger price" value="1" />
        </Grid>

        <Grid item xs={4}>
          <ItemCol label="Avg. price" value="1" />
        </Grid>

        <Grid item xs={4}>
          <ItemCol label="Order price" value="1" />
        </Grid>

        <Grid item xs={4}>
          <ItemCol
            label="Realized Pnl (USDC)"
            value={
              (order as any).realized_pnl > 0
                ? formatQty((order as any).realized_pnl, baseDecimals)
                : "--"
            }
          />
        </Grid>
      </Grid> */}
    </Item>
  );
};

export default memo(OrderHistoryItemMobile);

const Item = styled(ListItem)(({ theme }) => ({
  width: "100%",
  borderRadius: TSizes.borderRadius,
  flexDirection: "column",
  marginBottom: "6px",
  backgroundColor: setColorThemeMode(
    theme.palette.primary.light,
    theme.palette.grey[800]
  ),
}));

interface IItem {
  label: string;
  value: string | ReactElement;
}

const ItemCol = ({ label, value }: IItem) => {
  const theme = useTheme();

  return (
    <Stack>
      <Typography
        fontSize={"12px"}
        color={setColorThemeMode(
          theme.palette.grey[800],
          theme.palette.grey[500]
        )}
      >
        {label}
      </Typography>

      {typeof value == "string" ? (
        <Typography
          fontSize={"12px"}
          color={setColorThemeMode(
            theme.palette.grey[800],
            theme.palette.grey[200]
          )}
        >
          {value}
        </Typography>
      ) : (
        <Box fontSize={"12px"}>{value}</Box>
      )}
    </Stack>
  );
};
