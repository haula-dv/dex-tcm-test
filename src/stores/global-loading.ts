import { createZustandStore } from "nes-zustand";

export const loadingState = createZustandStore<boolean>({
  key: "loadingState",
  default: false,
});
