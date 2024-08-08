import { getZustandValue, setZustandValue } from "nes-zustand";
import { tokenInputState, tokenOutputState } from "./store";

// Change swap type
export const toggleSwapType = () => {
  const tokenInput = getZustandValue(tokenInputState);
  const tokenOutput = getZustandValue(tokenOutputState);

  setZustandValue(tokenInputState, tokenOutput);
  setZustandValue(tokenOutputState, tokenInput);
};
