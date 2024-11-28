import { getImageNextwork } from "@/common";
import MainCard from "@/components/card/MainCard";
import IconLoading from "@/components/icons/loading";
import IconNotFound from "@/components/icons/NotFound";
import { ItemRow } from "@/components/ItemRow";
import { apiClientFetch } from "@/utils/apiClient";
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
import { Select } from "@orderly.network/react";
import { useConnectWallet } from "@web3-onboard/react";
import dayjs from "dayjs";
import Image from "next/image";
import { memo, useEffect, useMemo, useState } from "react";

const FundingContainer = () => {
  const theme = useTheme();
  const [rows, setRows] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [currentSide, setCurrentSide] = useState("all");
  const [currentSize, setCurrentSize] = useState(10);
  const [total, setTotal] = useState(0);

  const [filter, setFilter] = useState<any>({
    page: 1,
    size: 10,
    // symbol: "PERP_BTC_USDC",
  });

  const onFetchAssetHistory = async () => {
    const queryString = new URLSearchParams(
      Object.fromEntries(
        Object.entries(filter).map(([key, value]) => [key, String(value)])
      )
    ).toString();

    setIsLoading(true);
    await apiClientFetch
      .GET(wallet, `/funding_fee/history?${queryString}`)
      .then((res: any) => {
        setRows(res.data.rows);
        setTotal(res.data.meta.total);
      })
      .finally(() => {
        setIsLoading(false);
      });
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

  const totalCount = useMemo(() => {
    return Math.ceil(total / currentSize);
  }, [total, currentSize]);

  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <Stack direction={"row"} spacing={1} pb={"6px"}>
        <Select value={currentSide} className="main-select" options={type} />

        {/* <Button
          size="small"
          variant="outlined"
          sx={{ height: "30px !important" }}
          startIcon={<IconCalendar size={"1rem"} />}
          endIcon={<IconChevronDown size={"1rem"} />}
        >
          2024/11/12 - 2024/11/26
        </Button> */}
      </Stack>

      {!mdDown ? (
        <>
          <MainCard variant="outlined" backgroudColor="primary" disablePadding>
            <TableContainer>
              <Table aria-labelledby="tableTitle" size={"small"} stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Instrument</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Funding rate / Annual rate </TableCell>
                    <TableCell>Payment type </TableCell>
                    <TableCell>Funding fee (USDC)</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {rows.length > 0 ? (
                    <>
                      {rows.map((item: any, index) => {
                        const [a, b, c] = item.symbol.split("_");

                        return (
                          <TableRow key={index}>
                            <TableCell>
                              <Stack direction={"row"} spacing={"2px"}>
                                <Box flexShrink={0}>
                                  <Image
                                    src={getImageNextwork(b, "symbol_logo")}
                                    height={18}
                                    width={18}
                                    alt=""
                                    style={{ flexShrink: 0 }}
                                  />
                                </Box>
                                <Typography fontSize={"12px"}>
                                  {b}-{a}
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
                              <Typography fontSize={"12px"}>
                                {`${(item.funding_rate * 100).toFixed(6)}%`}
                              </Typography>
                            </TableCell>

                            <TableCell>{item.payment_type}</TableCell>

                            <TableCell>
                              <Typography
                                fontSize={"12px"}
                                color={theme.palette.success.main}
                              >
                                {item.funding_fee}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        );
                      })}
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
          {isLoading ? (
            <IconLoading />
          ) : (
            <>
              {rows.length > 0 ? (
                <Stack spacing={1}>
                  {rows.map((item, index) => {
                    const [a, b, c] = item.symbol.split("_");
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
                                  src={getImageNextwork(b, "symbol_logo")}
                                  height={18}
                                  width={18}
                                  alt=""
                                  style={{ flexShrink: 0 }}
                                />
                              </Box>
                              <Typography fontSize={"12px"}>
                                {b}-{a}
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
                          title="Funding rate"
                          value={
                            <Typography fontSize={"12px"}>
                              {`${(item.funding_rate * 100).toFixed(6)}%`}
                            </Typography>
                          }
                        />

                        <ItemRow
                          title="Payment type"
                          value={item.payment_type}
                        />

                        <ItemRow
                          title="Funding fee (USDC)"
                          value={
                            <Typography
                              fontSize={"12px"}
                              color={theme.palette.success.main}
                            >
                              {item.funding_fee}
                            </Typography>
                          }
                        />
                      </MainCard>
                    );
                  })}

                  <Box display={"flex"} justifyContent={"space-between"}>
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
                  </Box>
                </Stack>
              ) : (
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  flexDirection={"column"}
                >
                  <IconNotFound />
                  <Typography fontSize={"12px"}>No results found.</Typography>
                </Box>
              )}
            </>
          )}
        </List>
      )}
    </>
  );
};

export default memo(FundingContainer);
const type = [
  { label: "All", value: "all" },
  { label: "Deposite", value: "DEPOSIT" },
  { label: "Withdraw", value: "WITHDRAW" },
];

const size = [
  { label: "5", value: 5 },
  { label: "10", value: 10 },
  { label: "20", value: 20 },
  { label: "50", value: 50 },
  { label: "100", value: 100 },
];
