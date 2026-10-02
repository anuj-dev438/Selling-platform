"use client";
import {useState} from "react"
export default function TrackOrder(){
    const [orderId,setOrderId]=useState("");
    const [order,setOrder]=useState(null);
    const [loading,setLoading]=useState(false);
    const [error,setError]= useState("")

    const traceOrder = async ()=>{
        if(!orderId.trim()){
            setError("please enter your order Id");
            return;
        }
        setLoading(true);
        setError(" ")
        setOrder(null)

        try{
            const response =await fetch(

                `http://localhost:5000/api/orders/track/${orderId.trim()}`
            )
            const data = await response.json();
            if(!response.ok){
                setError(data.message || "Order not found");
                return;
            }
            setOrder(data);
        }catch(error){
            console.log("Trace order error:".error);
            setError("Unable to connect to server")
        }finally{
            setLoading(false)
        }
    }

return(
    <main className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="mx-auto max-w-md">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900">
                    Track Your Order
                </h1>

       <p className="mt-2 text-gray-600">
        Enter your Order ID to check your order status
       </p>

            </div>
            {/* Search*/}
<div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
    <label className="text-sm font-semibold text-gray-700">
        Order ID
    </label>

   
<input type="text" value={orderId} onChange={(e) => setOrderId(e.target.value)}
onKeyDown={(e) => { if (e.key === "Enter") traceOrder(); }}
placeholder="Example: FS-12345678"
className="mt-2 w-full rounded-xl border-2 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder:text-gray-400 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
/>


<button
onClick={traceOrder}
disabled={loading}
className="mt-4 w-full rounded-xl bg-orange-600 py-3 font-semibold text-white transition
hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60
">
    {loading ? "Tracking..." : "Track Order"}

</button>

{/* Error */}

{error&&(
    <p className="mt-4 rounded-lg bg-red-50 p-3 text-cente text-sm font-medium text-red-600">
        {error}
    </p>
)}

</div>
{/* ORDER RESULT */}

{order&&(
    <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
       <div className="text-center">
<p className="text-sm text-gray-500">
    Order ID
</p>
<p className="mt-1 text-xl font-bold text-orange-600">
{order.orderId}
</p>
       </div>
       {/* Status */}

       <div className="mt-6 rounded-xl bg-orange-50 p-5 text-center">
        <p className="text-sm font-medium text-gray-500">
            Current Status
 </p>
 <p className="mt-2 text-2xl font-bold text-orange-600">
    {order.status}

 </p>

       </div>

       {/* customer */}
       <div className="mt-6">
        <p className="text-sm text-gray-500">
            Customer
        </p>
        <p className="mt-1 font-semibold text-gray-900">
            {order.customer?.name}
        </p>

       </div>

       {/* Total */}
  <div className="mt-4 flex items-center justify-between rounded-xl bg-gray-900 p-4">
    <span className="font-semibold text-white">
        Total Amount 
</span>
<span className="font-bold text-white">
    ₹{order.totalAmount}
</span>

  </div>


    </div>
)}

        </div>

    </main>
)    

}