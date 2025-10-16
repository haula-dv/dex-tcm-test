import { getPublicKey, sign } from "@noble/ed25519";
import { useSymbolsInfo } from "@orderly.network/hooks";
import bs58 from "bs58";
import { encodeBase58 } from "ethers";
import { getDecimalsFromTick } from "../formatters/api";

export const usdFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 6,
});

export type Scope = "read" | "read,trading";

const ORDERLY_KEY_LOCAL_STORAGE = "orderly_";
const BROKER_ID_LOCAL_STORAGE = "broker-id";
const CONTRACT_ADDRESS_LOCAL_STORAGE = "contract-address";

export const exampleDelegateContract =
  "0xa4394b62261061c629800c6d86d153a9f38f0cbb";

export async function signAndSendRequest(
  accountId: string,
  orderlyKey: Uint8Array | string,
  input: URL | string,
  init?: RequestInit | undefined
): Promise<Response> {
  const timestamp = Date.now();
  const encoder = new TextEncoder();

  const url = new URL(input);
  let message = `${String(timestamp)}${init?.method ?? "GET"}${url.pathname}`;
  if (init?.body) {
    message += init.body;
  }
  const orderlySignature = await sign(encoder.encode(message), orderlyKey);

  return fetch(input, {
    headers: {
      "Content-Type":
        init?.method !== "GET" && init?.method !== "DELETE"
          ? "application/json"
          : "application/x-www-form-urlencoded",
      "orderly-timestamp": String(timestamp),
      "orderly-account-id": accountId,
      "orderly-key": `ed25519:${encodeBase58(await getPublicKey(orderlyKey))}`,
      "orderly-signature": base64EncodeURL(orderlySignature),
      ...(init?.headers ?? {}),
    },
    ...(init ?? {}),
  });
}

export function loadOrderlyKey(
  walletAddress: string,
  networkId: any
): Uint8Array | undefined {
  let key: any = localStorage.getItem(
    `${ORDERLY_KEY_LOCAL_STORAGE}${networkId}_${walletAddress}`
  );
  key = JSON.parse(key);

  if (!key) return;
  return bs58.decode(key.orderlyKey);
}

export function loadAccountId(
  walletAddress: string,
  networkId: any
): Uint8Array | undefined {
  let key: any = localStorage.getItem(
    `${ORDERLY_KEY_LOCAL_STORAGE}${networkId}_${walletAddress}`
  );
  key = JSON.parse(key);

  if (!key) return;
  return key.accountId;
}

export function loadBrokerId(chainId: string): string {
  return (
    window.localStorage.getItem(`${BROKER_ID_LOCAL_STORAGE}:${chainId}`) ?? ""
  );
}

export function saveBrokerId(chainId: string, brokerId: string) {
  return window.localStorage.setItem(
    `${BROKER_ID_LOCAL_STORAGE}:${chainId}`,
    brokerId
  );
}

export function loadContractAddress(chainId: string): string {
  return (
    window.localStorage.getItem(
      `${CONTRACT_ADDRESS_LOCAL_STORAGE}:${chainId}`
    ) ?? ""
  );
}

export function saveContractAddress(chainId: string, contractAddress: string) {
  return window.localStorage.setItem(
    `${CONTRACT_ADDRESS_LOCAL_STORAGE}:${chainId}`,
    contractAddress
  );
}

function base64EncodeURL(byteArray: Uint8Array) {
  return btoa(
    Array.from(new Uint8Array(byteArray))
      .map((val) => {
        return String.fromCharCode(val);
      })
      .join("")
  )
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

function base64DecodeURL(b64urlstring: string): Uint8Array {
  return new Uint8Array(
    atob(b64urlstring.replace(/-/g, "+").replace(/_/g, "/"))
      .split("")
      .map((val) => {
        return val.charCodeAt(0);
      })
  );
}

export const getDecimals = (symbol: string) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const symbolsInfo = useSymbolsInfo();
  const symbolInfo = symbolsInfo[symbol]();
  const [baseDecimals, quoteDecimals] = getDecimalsFromTick(symbolInfo);

  return {
    baseDecimals,
    quoteDecimals,
  };
};

export const formatQty = (value: any, decimals: any) => {
  return Number(value).toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};
