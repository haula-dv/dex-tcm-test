export class AppInfo {
  static BROKER_ID = process.env.BROKER_ID;
  static BROKER_NAME = process.env.BROKER_NAME ?? "Bazaarex";
}

export const TCMP_ORDERLY_SDK_TITLE_KEY = "tcmp_orderly_sdk_title_key";

export class TLocalStorage {
  static DEX_ORDERLY_MAINNET_ADDRESS_KEY = "dex_orderly_mainnet_address";
  static DEX_ORDERLY_MAINNET_WALLET_KEY = "dex_orderly_mainnet_wallet";
  static DEX_ORDERLY_TESTNET_ADDRESS = "dex_orderly_testnet_address";

  static DEX_ORDERLY_NETWORK = "networkId";

  static DEX_THEME_MODE = "tcmp_theme_mode";
}
