import { CartItem } from "./CartContext";

export const getCardItemsFromStorage = () => {
  const itemsFromLocalStorage = localStorage.getItem("CARD_SHOP");
  if (!itemsFromLocalStorage) {
    return [];
  }
  try {
    const items = JSON.parse(itemsFromLocalStorage);
    return items;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const setCardItemsInStorage = (cartItems: CartItem[]) => {
  localStorage.setItem("CARD_SHOP", JSON.stringify(cartItems));
};
