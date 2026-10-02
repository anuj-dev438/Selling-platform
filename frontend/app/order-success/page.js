
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function OrderSuccess() {
  const [order, setOrder] = useState(null);
const [copied, setCopied] = useState(false);
  useEffect(() => {
    const savedOrder = localStorage.getItem("order");

    if (savedOrder && savedOrder !== "undefined") {
      try {
        setOrder(JSON.parse(savedOrder));
      } catch (error) {
        console.log("Invalid order data:", error);
        localStorage.removeItem("order");
      }
    }
  }, []);


  const copyOrderId =async()=>{
    try{
await navigator.clipboard.writeText(order.orderId);
setCopied(true)
setTimeout(()=>{
  setCopied(false);
},2000);
    }catch(error){
console.log("copy failed", error)
    }
  }

  if (!order) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-lg font-medium text-gray-700">
          Loading...
        </p>
      </main>
    );
  }

  
const sendOrderOnWhatsApp = () => {
    const message = `Your order has been placed successfully!

Order ID: ${order.orderId}
Total Amount: ₹${order.totalAmount}

Thank you!`;

    const whatsappUrl =
        `https://wa.me/?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");
};



  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">

      <div className="mx-auto max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">

        {/* ========================= */}
        {/* SUCCESS SECTION */}
        {/* ========================= */}

        <div className="text-center">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <span className="text-4xl font-bold text-green-600">
              ✓
            </span>
          </div>

          <h1 className="mt-5 text-3xl font-bold text-gray-900">
            Order Successful!
          </h1>

          <p className="mt-2 text-gray-600">
            Your order has been placed successfully.
          </p>

        </div>

        {/* ========================= */}
        {/* CUSTOMER DETAILS */}
        {/* ========================= */}

        <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-5">

          <h2 className="text-lg font-bold text-gray-900">
            Customer Details
          </h2>


          <div className="mt-4 space-y-3">

            <div>

              <p className="text-sm font-medium text-gray-500">
                Name
              </p>

              <p className="mt-1 text-base font-semibold text-gray-900">
                {order.customer.name}
              </p>

            </div>


            <div>

              <p className="text-sm font-medium text-gray-500">
                Mobile Number
              </p>

              <p className="mt-1 text-base font-semibold text-gray-900">
                {order.customer.phone}
              </p>

            </div>


            <div>

              <p className="text-sm font-medium text-gray-500">
                Delivery Address
              </p>

              <p className="mt-1 text-base font-semibold text-gray-900">
                {order.customer.address}
              </p>

            </div>

          </div>

        </div>


        {/* ========================= */}
        {/* ORDER SUMMARY */}
        {/* ========================= */}
<div className="mt-6 rounded-xl border border-orange-200 bg-orange-50 p-5 text-center">
    <p className="text-sm font-medium text-gray-600">
        Your Order ID
    </p>

 
<button
    onClick={copyOrderId}
    className="rounded-lg bg-white px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-100"
>
    {copied ? "✓ Copied" : "📋 Copy"}
</button>



    <p className="mt-2 text-xs text-gray-500">
        Copy this Order ID to track your order.
    </p>
</div>
        <div className="mt-6">

          <h2 className="text-lg font-bold text-gray-900">
            Order Summary
          </h2>


          <div className="mt-3 rounded-xl border border-gray-200 bg-white">

            {order.items.map((item, index) => (

              <div
                key={item._id || index}
                className="flex items-center justify-between border-b border-gray-200 p-4 last:border-b-0"
              >

                <div>

                  <p className="font-semibold text-gray-900">
                    {item.name}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    ₹{item.price} × {item.quantity}
                  </p>

                </div>


                <p className="font-semibold text-gray-900">
                  ₹{item.price * item.quantity}
                </p>

              </div>

            ))}

          </div>


<button
    onClick={sendOrderOnWhatsApp}
    className="mt-4 w-full rounded-xl bg-green-600 py-3 font-semibold text-white hover:bg-green-700"
>
    Send Order ID on WhatsApp
</button>


          {/* TOTAL */}

          <div className="mt-4 flex items-center justify-between rounded-xl bg-gray-900 p-4">

            <span className="text-lg font-bold text-white">
              Total
            </span>

            <span className="text-lg font-bold text-white">
              ₹{order.totalAmount}
            </span>

          </div>

        </div>


        {/* ========================= */}
        {/* CONTINUE SHOPPING */}
        {/* ========================= */}

        <Link
          href="/"
          className="mt-6 block w-full rounded-xl bg-orange-600 py-3 text-center font-semibold text-white transition hover:bg-orange-700"
        >
          Continue Shopping
        </Link>

      </div>

    </main>
  );
}

