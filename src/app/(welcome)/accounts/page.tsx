import { AccountContainer } from "@/plugins/account/components/AccountContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accounts",
  description: "...",
};
export default function AccountPage() {
  return <AccountContainer />;
}
