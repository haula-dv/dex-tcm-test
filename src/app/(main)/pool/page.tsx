import { PoolContainer } from "@/plugins/pool/components/PoolContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pool",
  description: "...",
};

export default function HomePage() {
  return <PoolContainer />;
}
