export class TDotEnv {
  static API_ENDPOINT_URL = process.env.API_URL;
  static TOKEN_API_URL =
    process.env.TOKEN_API_URL ??
    "https://interface.gateway.uniswap.org/v1/graphql";
  static BROKER_ID = process.env.BROKER_ID ?? "";
  static NEXTWORK_URL = process.env.NEXTWORK_URL ?? "";
}
