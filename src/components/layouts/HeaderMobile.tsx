import { useWalletConnector } from "@orderly.network/hooks";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { memo, useState } from "react";
import { MainAppBar } from "./Header";

function HeaderMobile() {
  const { wallet, connecting } = useWalletConnector();
  const { open } = useWeb3Modal();
  const [openAccountDetailsModal, setAccountDetailsModal] = useState(false);

  // Handle connect wallet button
  const handleConnectWallet = async () => {
    await open();
  };

  console.log("wallet", wallet);
  console.log("connecting", connecting);

  return (
    <MainAppBar elevation={0} position="sticky">
      {/* <OrderlyConnect />

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
                {formartAddress(wallet.accounts?.[0]?.address || "")}
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
      )} */}
    </MainAppBar>
  );
}

export default memo(HeaderMobile);
