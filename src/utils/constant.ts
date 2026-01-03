export enum PathEnum {
  Root = "/",
  Perp = "/perp",

  Portfolio = "/portfolio",
  Positions = "/portfolio/positions",
  Orders = "/portfolio/orders",
  Assets = "/portfolio/assets",
  FeeTier = "/portfolio/fee",
  Setting = "/portfolio/setting",
  History = "/portfolio/history",

  Markets = "/markets",
}

export const PageTitleMap = {
  [PathEnum.Portfolio]: "Portfolio",
  [PathEnum.FeeTier]: "Fee tier",
  [PathEnum.Orders]: "Orders",
  [PathEnum.Assets]: "Assets",
  [PathEnum.Positions]: "Positions",
  [PathEnum.Setting]: "Settings",
  [PathEnum.History]: "History",
  [PathEnum.Markets]: "Markets",
};
