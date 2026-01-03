import { MainLayoutTrade } from "@/plugins/trade/components/MainLayoutTrade";

export default async function PerpPage({ params }: { params: { symbol: string } }) {
  const { symbol } = await params;
  return (
    <MainLayoutTrade symbol={symbol} />
  );
}
