import { getImageNextwork } from "@/common";
import { MainButton } from "@/components/button/MainButton";
import theme from "@/utils/themes/mui-theme";
import { Grid, Typography } from "@mui/material";
import { API } from "@orderly.network/types";
import { IconCheck } from "@tabler/icons-react";
import Image from "next/image";

interface IProps {
  chain: API.Chain;
  isSelected: boolean;
  handleChangeNextwork: (chain: API.Chain) => void;
}

export const NetworkItem = ({
  chain,
  isSelected,
  handleChangeNextwork,
}: IProps) => {
  return (
    <Grid item md={12} mx={0.5}>
      <MainButton
        color="inherit"
        fullWidth
        align="start"
        variant={isSelected ? "filledTonal" : "text"}
        onClick={() => handleChangeNextwork(chain)}
        startIcon={
          <Image
            src={getImageNextwork(chain.network_infos.chain_id)}
            height={20}
            width={20}
            alt=""
            style={{
              overflow: "hidden",
              borderRadius: "50%",
            }}
          />
        }
      >
        <Typography flex={1} textAlign={"start"}>
          {chain?.network_infos?.name}
        </Typography>

        {isSelected ? (
          <IconCheck size="1rem" color={theme.palette.success.main} />
        ) : null}
      </MainButton>
    </Grid>
  );
};
