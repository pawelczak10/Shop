import { createContext, useState, useEffect } from "react";
import { ReactNode } from "react-markdown/lib/ast-to-react";
import { useContext } from "react";
import { getCardItemsFromStorage } from "./cartModal";
import { setCardItemsInStorage } from "./cartModal";

export interface CartItem {
  readonly id: string;
  readonly price: number;
  readonly title: string;
  readonly count: number;
}
interface CartState {
  readonly items: readonly CartItem[];
  readonly addItemToCart: (item: CartItem) => void;
  readonly removeItemFromCart: (id: CartItem["id"]) => void;
}

export const CartStateContext = createContext<CartState | null>(null);

export const CartStateContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setCartItems(getCardItemsFromStorage());
  }, []);

  useEffect(() => {
    setCardItemsInStorage(cartItems);
  }, [cartItems]);

  return (
    <CartStateContext.Provider
      value={{
        items: cartItems,
        addItemToCart: (item) => {
          setCartItems((prevState) => {
            const existingItem = prevState.find(
              (existingitem) => existingitem.id === item.id
            );
            if (!existingItem) {
              return [...prevState, item];
            }
            return prevState.map((existingItem) => {
              if (existingItem.id === item.id) {
                return {
                  ...existingItem,
                  count: existingItem.count + 1,
                };
              }
              return existingItem;
            });
          });
        },
        removeItemFromCart: (id) => {
          setCartItems((prevState) => {
            const existingItem = prevState.find((el) => el.id === id);
            if (existingItem && existingItem.count <= 1) {
              return prevState.filter((el) => el.id != id);
            }

            return prevState.map((existingItem) => {
              if (existingItem.id === id) {
                return {
                  ...existingItem,
                  count: existingItem.count - 1,
                };
              }
              return existingItem;
            });
          });
        },
      }}
    >
      {children}
    </CartStateContext.Provider>
  );
};

export const useCartState = () => {
  const cartState = useContext(CartStateContext);

  if (!cartState) {
    throw new Error("You forgot CartStateContextProvider");
  }
  return cartState;
};
