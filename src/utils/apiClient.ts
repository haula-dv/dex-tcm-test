import { signAndSendRequest } from "./config/signer";
import { getBaseUrl } from "./constants/orderly";
import { loadAccountId, loadOrderlyKey } from "./helpers/orderlyHelper";

export class apiClientFetch {
  static GET = async (
    wallet: any,
    url: string,
    networkId: string,
    payload?: any
  ) => {
    const orderlyKey: any = loadOrderlyKey(
      wallet?.accounts[0].address ?? "",
      networkId
    );
    const orderlyAccountId: any = loadAccountId(
      wallet?.accounts[0].address ?? "",
      networkId
    );

    return await signAndSendRequest(
      orderlyAccountId,
      orderlyKey,
      `${getBaseUrl(networkId)}${url}`,
      {
        method: "GET",
        body: JSON.stringify(payload),
      }
    );
  };
}
