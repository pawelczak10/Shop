import { useCartState } from "./../components/Cart/CartContext";
import { loadStripe } from "@stripe/stripe-js";
import Stripe from "stripe";

const stripePromise = loadStripe(
  "pk_test_51MAcdFGWaXoXmu0wQ5IWd0fX5G4RqH9is8FMuiGKYSilWaJk5pgrRIK8yD9V1ZgyEQ5xahNml0LrAwtd053CseGG00zMk9yQUp"
);

const CartContent = () => {
  const cartState = useCartState();

  const pay = async () => {
    const stripe = await stripePromise;
    if (!stripe) {
      throw new Error("Somothing went wrong");
    }
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        cartState.items.map((cartItem) => {
          return {
            id: cartItem.id,
            count: cartItem.count,
          };
        })
      ),
    });
    const { session }: { session: Stripe.Response<Stripe.Checkout.Session> } =
      await res.json();
    await stripe.redirectToCheckout({ sessionId: session.id });
  };
  return (
    <div className="col-span-2">
      <ul className="divide-y divide-gray-200">
        {cartState.items.map((item, index) => (
          <li className="py-4" key={index}>
            <div className="flex justify-between">
              <div>
                {item.count} x {item.title}
              </div>
              <div>
                {item.price}
                <button
                  className="ml-4 text-red-500"
                  onClick={() => {
                    cartState.removeItemFromCart(item.id);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                    aria-label="Usuń element"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <button
        onClick={pay}
        type="button"
        className="w-full, bg-indigo-600 border border-transparent rounded-none"
      >
        Confirm order
      </button>
    </div>
  );
};

const CardSummary = () => {
  const cartState = useCartState();

  return (
    <div>
      Podsumowanie koszyka
      <div className="font-bold">
        Liczba elementów: {cartState.items.length}
      </div>
    </div>
  );
};

const Cart = () => {
  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="grid grid-cols-3 gap-8">
        <CartContent />
        <CardSummary />
      </div>
    </div>
  );
};

export default Cart;
