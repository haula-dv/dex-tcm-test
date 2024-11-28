import { MainIconButton } from "@/components/button/MainIconButton";
import MainCard from "@/components/card/MainCard";
import IconLoading from "@/components/icons/loading";
import IconNotFound from "@/components/icons/NotFound";
import MainTooltip from "@/components/MainTooltip";
import { apiClientFetch } from "@/utils/apiClient";
import { formartAddress } from "@/utils/formatters/token";
import { formatQty } from "@/utils/helpers/orderlyHelper";
import {
  Box,
  List,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Select, toast } from "@orderly.network/react";
import { IconCopy } from "@tabler/icons-react";
import { useConnectWallet } from "@web3-onboard/react";
import dayjs from "dayjs";
import Image from "next/image";
import { memo, useEffect, useMemo, useState } from "react";
import { ItemRow } from "../pool/components/TokenSelected";

const DepositsWithdrawalsContainer = () => {
  const theme = useTheme();
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [currentSide, setCurrentSide] = useState("all");
  const [currentSize, setCurrentSize] = useState(10);
  const [rowsDeposite, setRowsDeposite] = useState([]);
  const [rowsDepositeLoading, setRowsDepositeLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const [filter, setFilter] = useState<any>({
    page: 1,
    size: 10,
  });

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copy address");
  };

  const onFetchAssetHistory = async () => {
    const queryString = new URLSearchParams(
      Object.fromEntries(
        Object.entries(filter).map(([key, value]) => [key, String(value)])
      )
    ).toString();

    setRowsDepositeLoading(true);
    await apiClientFetch
      .GET(wallet, `/asset/history?${queryString}`)
      .then((res: any) => {
        setRowsDeposite(res.data.rows);
      })
      .finally(() => {
        setRowsDepositeLoading(false);
      });
  };

  const onChangeSide = (side: string) => {
    const query = {
      ...filter,
      side: side,
      page: 1,
    };

    if (side === "all" && query.side) {
      delete query.side;
    }

    setFilter(query);
    setCurrentSide(side);
  };

  const onChangeSize = (size: string) => {
    setFilter({
      ...filter,
      size,
      page: 1,
    });
    setCurrentSize(Number(size));
  };

  useEffect(() => {
    onFetchAssetHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const onChangePage = (e: any, page: number) => {
    setFilter({
      ...filter,
      page,
    });
  };

  const handleChangeDate = (dateInfo: any) => {
    console.log("dateInfo");
    // setFilter({
    //   ...filter,
    //   start_t: dayjs(dateInfo.from).valueOf(),
    //   end_t: dayjs(dateInfo.to).valueOf(),
    // });
  };

  const totalCount = useMemo(() => {
    return Math.ceil(total / currentSize);
  }, [total, currentSize]);

  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <Stack direction={"row"} spacing={1} pb={"6px"}>
        <Select
          value={currentSide}
          onChange={onChangeSide}
          className="main-select"
          options={type}
        />

        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            onNextClick={handleChangeDate}
            className="custom-date-range"
          />
        </LocalizationProvider> */}
      </Stack>

      {!mdDown ? (
        <>
          <MainCard
            variant="outlined"
            backgroudColor="primary"
            disablePadding
            minHeight="300px"
          >
            <TableContainer>
              <Table
                aria-labelledby="tableTitle"
                size={"small"}
                stickyHeader
                sx={{ maxHeight: "200px" }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Token</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>TxID</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Amount</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {rowsDeposite.length > 0 ? (
                    <>
                      {rowsDeposite.map((item: any, index) => (
                        <TableRow key={index}>
                          <TableCell>
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
                          </TableCell>

                          <TableCell>
                            <Typography>
                              {dayjs(item.created_time).format(
                                "YYYY-MM-DD HH:mm:ss"
                              )}
                            </Typography>
                          </TableCell>

                          <TableCell>
                            <Stack direction={"row"} alignItems={"center"}>
                              <MainTooltip
                                arrow
                                title={formartAddress(item.tx_id)}
                              >
                                <a
                                  href={`https://sepolia.arbiscan.io/tx/${item.tx_id}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Typography fontSize={"12px"}>
                                    {formartAddress(item.tx_id)}
                                  </Typography>
                                </a>
                              </MainTooltip>

                              <MainIconButton
                                size="small"
                                edge="end"
                                onClick={() => handleCopy(item.tx_id)}
                              >
                                <IconCopy size={"1rem"} />
                              </MainIconButton>
                            </Stack>
                          </TableCell>

                          <TableCell>{item.trans_status}</TableCell>

                          <TableCell>
                            <Typography
                              fontSize={"12px"}
                              color={
                                item.side == "WITHDRAW"
                                  ? theme.palette.error.main
                                  : theme.palette.success.main
                              }
                            >
                              {item.side == "WITHDRAW"
                                ? "Withdraw"
                                : "Deposite"}
                            </Typography>
                          </TableCell>

                          <TableCell>
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
                          </TableCell>
                        </TableRow>
                      ))}
                    </>
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        <Box
                          display={"flex"}
                          justifyContent={"center"}
                          alignItems={"center"}
                        >
                          <IconNotFound />
                        </Box>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </MainCard>

          <Stack direction={"row"} justifyContent={"space-between"} pt={1}>
            <Stack direction={"row"} spacing={"6px"}>
              <Typography fontSize={"12px"}>Rows per page</Typography>
              <Select
                value={currentSize}
                onChange={onChangeSize}
                className="main-select"
                options={size}
              />
            </Stack>

            <Pagination
              size="small"
              page={filter.page}
              count={totalCount}
              shape="rounded"
              onChange={onChangePage}
            />
          </Stack>
        </>
      ) : (
        <List>
          {rowsDepositeLoading ? (
            <IconLoading />
          ) : (
            <>
              {rowsDeposite.length > 0 ? (
                <Stack spacing={1}>
                  {rowsDeposite.map((item: any, index) => {
                    return (
                      <MainCard
                        key={index}
                        backgroudColor="common"
                        variant="outlined"
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
                              {item.side == "WITHDRAW"
                                ? "Withdraw"
                                : "Deposite"}
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
                      </MainCard>
                    );
                  })}

                  <Box display={"flex"} justifyContent={"center"}>
                    <Pagination
                      size="small"
                      page={filter.page}
                      count={totalCount}
                      shape="rounded"
                      onChange={onChangePage}
                    />
                  </Box>
                </Stack>
              ) : (
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <IconNotFound />
                </Box>
              )}
            </>
          )}
        </List>
      )}
    </>
  );
};

export default memo(DepositsWithdrawalsContainer);
const type = [
  { label: "All", value: "all" },
  { label: "Deposite", value: "DEPOSIT" },
  { label: "Withdraw", value: "WITHDRAW" },
];

const size = [
  { label: "10", value: 10 },
  { label: "20", value: 20 },
  { label: "50", value: 50 },
  { label: "100", value: 100 },
];
