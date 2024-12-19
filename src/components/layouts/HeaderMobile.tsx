import NetworkContent from "@/plugins/wallet/components/NetworkContent";
import { OrderlyConnect } from "@/plugins/wallet/components/OrderlyConnect";
import { formartAddress } from "@/utils/formatters/token";
import { setColorThemeMode } from "@/utils/helpers";
import { TSizes } from "@/utils/themes/custom-theme/sizes";
import { IconButton, Stack, Toolbar } from "@mui/material";
import { IconMenu } from "@tabler/icons-react";
import { useConnectWallet } from "@web3-onboard/react";
import Link from "next/link";
import { memo, useState } from "react";
import { MainButton } from "../button/MainButton";
import Logo from "../icons/Logo";
import AccountDetailMobile from "./AccountDetailMobile";
import { MainAppBar } from "./Header";

function HeaderMobile() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [openAccountDetailsModal, setAccountDetailsModal] = useState(false);

  // Handle connect wallet button
  const handleConnectWallet = async () => {
    await connect().then((res) => {
      if (res && res.length > 0) {
        location.reload();
      }
    });
  };
  return (
    <MainAppBar elevation={0} position="sticky">
      <OrderlyConnect />

      <Toolbar sx={{ px: "10px !important" }}>
        <Stack
          direction={"row"}
          width={"100%"}
          spacing={TSizes.margin_sm}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Link href={"/trading"}>
            <Logo width="80px" height="40px" />
          </Link>

          <Stack
            direction={"row"}
            spacing={"6px"}
            alignItems={"center"}
            className="mobile-header-wrapper"
          >
            <NetworkContent />

            {!wallet ? (
              <MainButton
                variant="contained"
                id="connect-wallet"
                onClick={handleConnectWallet}
                isLoading={connecting}
              >
                Connect Wallet
              </MainButton>
            ) : (
              <MainButton
                variant="contained"
                id="connect-wallet"
                color={setColorThemeMode("darkGrey", "darkGrey")}
              >
                {formartAddress(wallet.accounts[0].address)}
              </MainButton>
            )}

            <IconButton
              size="small"
              onClick={() => setAccountDetailsModal(true)}
            >
              <IconMenu />
            </IconButton>
          </Stack>
        </Stack>
      </Toolbar>

      {openAccountDetailsModal && (
        <AccountDetailMobile
          open={openAccountDetailsModal}
          handleClose={() => setAccountDetailsModal(false)}
        />
      )}
    </MainAppBar>
  );
}

export default memo(HeaderMobile);
