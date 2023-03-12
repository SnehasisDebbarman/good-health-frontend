import { selector } from "recoil";
import { messageState } from "../atoms/admin";

export const mesaages = selector({
  key: "messages", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => get(messageState),
  set: ({ set, get }) => {
    let message = get(messageState);
    return message;
  },
});

export const totalMessage = selector({
  key: "totalMessages", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    let message = get(messageState);

    return cartValue.length ?? 0;
  },
});
