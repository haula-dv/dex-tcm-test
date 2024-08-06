import { AddLiquidityContainer } from "@/plugins/liquidity/components/AddLiquidityContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add liquidity",
  description: "...",
};

export default function AddLiquidityPage() {
  return <AddLiquidityContainer />;
}
