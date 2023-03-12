import { atom } from "recoil";

export const messageState = atom({
  key: "messageState", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});
