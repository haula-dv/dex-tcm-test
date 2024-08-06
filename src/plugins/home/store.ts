import { createZustandStore } from "nes-zustand";

export const isTransactionSubmittedState = createZustandStore<boolean>({
  key: "isTransactionSubmittedState",
  default: false,
});
