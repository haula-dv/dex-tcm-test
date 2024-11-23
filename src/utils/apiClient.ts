import { signAndSendRequest } from "./config/signer";
import { getBaseUrl } from "./constants/orderly";
import { loadAccountId, loadOrderlyKey } from "./helpers/orderlyHelper";

export class apiClientFetch {
  static GET = async (wallet: any, url: string, payload?: any) => {
    const orderlyKey: any = loadOrderlyKey(wallet?.accounts[0].address ?? "");
    const orderlyAccountId: any = loadAccountId(
      wallet?.accounts[0].address ?? ""
    );

    return await signAndSendRequest(
      orderlyAccountId,
      orderlyKey,
      `${getBaseUrl()}${url}`,
      {
        method: "GET",
        body: JSON.stringify(payload),
      }
    );
  };
}
