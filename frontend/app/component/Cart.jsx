
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Cart({
  cart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
}) {
  const router = useRouter();

  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
  });

  // =========================
  // TOTAL AMOUNT
  // =========================

  const totalAmount = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  // =========================
  // PLACE ORDER
  // =========================

  const handlePlaceOrder = async () => {
    if (loading) return;

    if (
      !customer.name ||
      !customer.phone ||
      !customer.address
    ) {
      alert("Please fill all customer details");
      return;
    }

    try {
      setLoading(true);

      const orderData = {
        customer: {
          name: customer.name,
          phone: customer.phone,
          address: customer.address,
        },

        items: cart.map((item) => ({
          product: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),

        totalAmount: totalAmount,
      };

      console.log("Sending order:", orderData);

      const response = await fetch(
        "http://localhost:5000/api/orders",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(orderData),
        }
      );

      const data = await response.json();

      console.log("Order response:", data);

      // =========================
      // ERROR RESPONSE
      // =========================

      if (!response.ok) {
        alert(
          data.message || "Order failed"
        );
        return;
      }

      // =========================
      // CHECK ORDER
      // =========================

      if (!data.order) {
        console.log(
          "Order response does not contain order:",
          data
        );

        alert(
          "Order response is invalid"
        );

        return;
      }

      // =========================
      // SAVE ORDER
      // =========================

      localStorage.setItem(
        "order",
        JSON.stringify(data.order)
      );

      // =========================
      // SUCCESS PAGE
      // =========================

      router.push("/order-success");

    } catch (error) {
      console.error(
        "Order error:",
        error
      );

      alert(
        "Unable to place order. Please check your backend."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 rounded-2xl border bg-white p-5 text-gray-800">

      {/* =========================
          CART TITLE
      ========================= */}

      <h2 className="text-2xl font-bold text-gray-900">
        Your Cart
      </h2>

      {/* =========================
          EMPTY CART
      ========================= */}

      {cart.length === 0 ? (

        <p className="mt-4 text-gray-500">
          Your cart is empty
        </p>

      ) : (

        <div className="mt-4">

          {/* =========================
              CART ITEMS
          ========================= */}

          {cart.map((item) => (

            <div
              key={item._id}
              className="flex items-center justify-between border-b py-4"
            >

              {/* PRODUCT */}

              <div>
                <h3 className="font-semibold text-gray-900">
                  {item.name}
                </h3>

                <p className="text-gray-500">
                  ₹{item.price} × {item.quantity}
                </p>
              </div>

              {/* QUANTITY */}

              <div className="flex items-center gap-3">

                <button
                  onClick={() =>
                    decreaseQuantity(item._id)
                  }
                  className="rounded-md bg-gray-200 px-3 py-1 text-gray-800 hover:bg-gray-300"
                >
                  −
                </button>

                <span className="font-semibold text-gray-900">
                  {item.quantity}
                </span>

                <button
                  onClick={() =>
                    increaseQuantity(item._id)
                  }
                  className="rounded-md bg-gray-200 px-3 py-1 text-gray-800 hover:bg-gray-300"
                >
                  +
                </button>

              </div>

              {/* PRICE */}

              <div className="text-right">

                <p className="font-semibold text-gray-900">
                  ₹{item.price * item.quantity}
                </p>

                <button
                  onClick={() =>
                    removeFromCart(item._id)
                  }
                  className="text-sm text-red-500 hover:text-red-700"
                >
                  Remove
                </button>

              </div>

            </div>

          ))}

          {/* =========================
              TOTAL
          ========================= */}

          <div className="mt-5 flex items-center justify-between border-t pt-4">

            <h3 className="text-xl font-bold text-gray-900">
              Total
            </h3>

            <p className="text-xl font-bold text-gray-900">
              ₹{totalAmount}
            </p>

          </div>

        </div>
      )}

      {/* =========================
          PLACE ORDER
      ========================= */}

      {cart.length > 0 && (

        <button
          onClick={() => setShowForm(true)}
          className="mt-5 w-full rounded-xl bg-orange-600 py-3 font-semibold text-white transition hover:bg-orange-700"
        >
          Place Order
        </button>

      )}

      {/* =========================
          CUSTOMER FORM
      ========================= */}

      {showForm && (

        <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-5">

          <h3 className="text-xl font-bold text-gray-900">
            Customer Details
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Enter your details to place the order.
          </p>

          {/* NAME */}

          <input
            type="text"
            placeholder="Your Name"
            value={customer.name}
            onChange={(e) =>
              setCustomer({
                ...customer,
                name: e.target.value,
              })
            }
            className="mt-4 w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 outline-none placeholder:text-gray-400 focus:border-orange-500"
          />

          {/* PHONE */}

          <input
            type="tel"
            placeholder="Mobile Number"
            value={customer.phone}
            onChange={(e) =>
              setCustomer({
                ...customer,
                phone: e.target.value,
              })
            }
            className="mt-3 w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 outline-none placeholder:text-gray-400 focus:border-orange-500"
          />

          {/* ADDRESS */}

          <textarea
            placeholder="Delivery Address"
            value={customer.address}
            onChange={(e) =>
              setCustomer({
                ...customer,
                address: e.target.value,
              })
            }
            className="mt-3 w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 outline-none placeholder:text-gray-400 focus:border-orange-500"
            rows="3"
          />

          {/* CONFIRM */}

          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            className="mt-4 w-full rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700 disabled:opacity-60"
          >
            {loading
              ? "Placing Order..."
              : "Confirm Order"}
          </button>

        </div>

      )}

    </div>
  );
}

