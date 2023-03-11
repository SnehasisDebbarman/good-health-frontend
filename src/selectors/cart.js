import { selector } from "recoil";
import { cartState } from "../atoms/cart";

export const cartItems = selector({
  key: "cartItems", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => get(cartState),
  set: ({ set, get }) => {
    let carts = get(cartState);
    return carts;
  },
});

export const totalCartValue = selector({
  key: "cartValue", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    let carts = get(cartState);
    let cartValue = 0;
    carts.map((it) => {
      cartValue += it.price * it.count;
    });
    return cartValue;
  },
});
