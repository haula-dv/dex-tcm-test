import { CreateAPairContainer } from "@/plugins/pair/components/CreateAPairContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create A Pair",
  description: "...",
};

export default function CreateAPairPage() {
  return <CreateAPairContainer />;
}
