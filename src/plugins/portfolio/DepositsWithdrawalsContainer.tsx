import { MainIconButton } from "@/components/button/MainIconButton";
import { formartAddress } from "@/utils/formatters/token";
import { setColorThemeMode } from "@/utils/helpers";
import { formatQty } from "@/utils/helpers/orderlyHelper";
import { TSizes } from "@/utils/themes/custom-theme/sizes";
import { Box, List, Stack, Typography, useTheme } from "@mui/material";
import { toast } from "@orderly.network/react";
import { IconCopy } from "@tabler/icons-react";
import dayjs from "dayjs";
import Image from "next/image";
import { memo } from "react";
import { ItemRow } from "../pool/components/TokenSelected";

interface IProps {
  rows: any[];
  isLoading: boolean;
}
const DepositsWithdrawalsContainer = ({ rows, isLoading }: IProps) => {
  const theme = useTheme();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copy address");
  };

  return (
    <List>
      {isLoading ? (
        "..."
      ) : (
        <>
          {rows.length > 0
            ? rows.map((item, index) => {
                return (
                  <Box
                    bgcolor={setColorThemeMode(
                      theme.palette.grey[100],
                      theme.palette.grey[800]
                    )}
                    key={index}
                    mb={TSizes.margin_mobile}
                    p={TSizes.margin_mobile}
                    borderRadius={"10px"}
                  >
                    <ItemRow
                      title="Token"
                      value={
                        <Stack direction={"row"} spacing={"2px"}>
                          <Box flexShrink={0}>
                            <Image
                              src={"/images/USDC.png"}
                              height={18}
                              width={18}
                              alt=""
                              style={{ flexShrink: 0 }}
                            />
                          </Box>
                          <Typography fontSize={"12px"}>
                            {item.token}
                          </Typography>
                        </Stack>
                      }
                    />
                    <ItemRow
                      title="Time"
                      value={dayjs(item.created_time).format(
                        "YYYY-MM-DD HH:mm:ss"
                      )}
                    />

                    <ItemRow
                      title="TxID"
                      value={
                        <Stack direction={"row"} alignItems={"center"}>
                          <a
                            href={`https://sepolia.arbiscan.io/tx/${item.tx_id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Typography fontSize={"12px"}>
                              {formartAddress(item.tx_id)}
                            </Typography>
                          </a>

                          <MainIconButton
                            size="small"
                            edge="end"
                            onClick={() => handleCopy(item.tx_id)}
                          >
                            <IconCopy size={"1rem"} />
                          </MainIconButton>
                        </Stack>
                      }
                    />

                    <ItemRow title="Status" value={item.trans_status} />
                    <ItemRow
                      title="Type"
                      value={
                        <Typography
                          fontSize={"12px"}
                          color={
                            item.side == "WITHDRAW"
                              ? theme.palette.error.main
                              : theme.palette.success.main
                          }
                        >
                          {item.side == "WITHDRAW" ? "Withdraw" : "Deposite"}
                        </Typography>
                      }
                    />
                    <ItemRow
                      title="Amount"
                      value={
                        <Typography
                          fontSize={"12px"}
                          color={
                            item.side == "WITHDRAW"
                              ? theme.palette.error.main
                              : theme.palette.success.main
                          }
                        >
                          {item.side == "WITHDRAW" ? "-" : "+"}{" "}
                          {formatQty(item.amount, 2)}
                        </Typography>
                      }
                    />
                  </Box>
                );
              })
            : ""}
        </>
      )}
    </List>
  );
};

export default memo(DepositsWithdrawalsContainer);

const Item = () => {
  return (
    <Stack direction={"row"} justifyContent={"space-between"}>
      <Typography fontSize={"12px"} sx={{ opacity: ".4" }}>
        Token
      </Typography>

      <Stack direction={"row"} spacing={"2px"}>
        <Box flexShrink={0}>
          <Image
            src={"/images/USDC.png"}
            height={18}
            width={18}
            alt=""
            style={{ flexShrink: 0 }}
          />
        </Box>
        <Typography fontSize={"12px"}>Token</Typography>
      </Stack>
    </Stack>
  );
};
