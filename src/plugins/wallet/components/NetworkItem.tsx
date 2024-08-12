import { getImageNextwork } from "@/common";
import { MainButton } from "@/components/button/MainButton";
import theme from "@/utils/themes/mui-theme";
import { Grid } from "@mui/material";
import { API } from "@orderly.network/types";
import { IconCheck } from "@tabler/icons-react";
import Image from "next/image";

interface IProps {
  chain: API.Chain;
  isSelected: boolean;
  handleChangeNextwork: (chainId: number) => void;
}

export const NetworkItem = ({
  chain,
  isSelected,
  handleChangeNextwork,
}: IProps) => {
  return (
    <Grid item md={12}>
      <MainButton
        size="small"
        color="inherit"
        fullWidth
        align="start"
        variant={isSelected ? "filledTonal" : "text"}
        onClick={() => handleChangeNextwork(chain.network_infos.chain_id ?? 0)}
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
        endIcon={
          isSelected ? (
            <IconCheck size="1rem" color={theme.palette.success.main} />
          ) : null
        }
      >
        {chain?.network_infos?.name}
      </MainButton>
    </Grid>
  );
};
