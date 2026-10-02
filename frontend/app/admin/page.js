"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // =========================
    // PRODUCTS
    // =========================

    const [products, setProducts] = useState([]);

    // =========================
    // PRODUCT FORM
    // =========================

    const [showProductForm, setShowProductForm] = useState(false);

    const [editingProductId, setEditingProductId] = useState(null);

    const [product, setProduct] = useState({
        name: "",
        price: "",
        image: "",
        category: ""
    });


    // =========================
    // GET ALL ORDERS
    // =========================

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem("adminToken");

                const response = await fetch(
                    "http://localhost:5000/api/orders",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const data = await response.json();

                if (response.ok) {
                    setOrders(data.orders);
                } else {
                    console.log(data.message);
                }

            } catch (error) {
                console.log(
                    "Error fetching orders:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);


    // =========================
    // GET ALL PRODUCTS
    // =========================

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5000/api/products"
                );

                const data = await response.json();

                if (response.ok) {
                    setProducts(data.products);
                } else {
                    console.log(data.message);
                }

            } catch (error) {
                console.log(
                    "Error fetching products:",
                    error
                );
            }
        };

        fetchProducts();
    }, []);


    // =========================
    // ADD PRODUCT
    // =========================

    const addProduct = async (e) => {
        e.preventDefault();

        try {
            const token =
                localStorage.getItem("adminToken");

            const response = await fetch(
                "http://localhost:5000/api/products",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        name: product.name,
                        price: Number(product.price),
                        image: product.image,
                        category: product.category
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {

                console.log(
                    "Product added:",
                    data
                );

                // Add new product to UI
                setProducts(
                    (previousProducts) => [
                        ...previousProducts,
                        data.product
                    ]
                );

                // Clear form
                setProduct({
                    name: "",
                    price: "",
                    image: "",
                    category: ""
                });

                // Close form
                setShowProductForm(false);

            } else {
                console.log(
                    "Error:",
                    data.message
                );
            }

        } catch (error) {
            console.log(
                "Error adding product:",
                error
            );
        }
    };


    // =========================
    // UPDATE ORDER STATUS
    // =========================

    const updateOrderStatus = async (
        orderId,
        status
    ) => {
        try {
            const token =
                localStorage.getItem("adminToken");

            const response = await fetch(
                `http://localhost:5000/api/orders/${orderId}/status`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json",

                        Authorization:
                            `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        status: status
                    })
                }
            );

            const data =
                await response.json();

            if (response.ok) {

                // Update frontend state
                // without refreshing page

                setOrders(
                    (previousOrders) =>
                        previousOrders.map(
                            (order) =>
                                order._id === orderId
                                    ? {
                                        ...order,
                                        status:
                                            data.order.status
                                    }
                                    : order
                        )
                );

            } else {
                console.log(
                    data.message
                );
            }

        } catch (error) {
            console.log(
                "Error updating order:",
                error
            );
        }
    };


    // =========================
    // DELETE PRODUCT
    // =========================

    const deleteProduct = async (productId) => {
        try {
            const token =
                localStorage.getItem("adminToken");

            const response = await fetch(
                `http://localhost:5000/api/products/${productId}`,
                {
                    method: "DELETE",

                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            const data =
                await response.json();

            if (response.ok) {

                // Remove product from UI
                setProducts(
                    (previousProducts) =>
                        previousProducts.filter(
                            (product) =>
                                product._id !== productId
                        )
                );

            } else {
                console.log(
                    data.message
                );
            }

        } catch (error) {
            console.log(
                "Error deleting product:",
                error
            );
        }
    };


    // =========================
    // EDIT PRODUCT
    // =========================

    const editProduct = (product) => {

        // Store product ID
        setEditingProductId(
            product._id
        );

        // Put old data into form
        setProduct({
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category
        });

        // Open form
        setShowProductForm(true);
    };


    // =========================
    // UPDATE PRODUCT
    // =========================

    const updateProduct = async (e) => {
        e.preventDefault();

        // Safety check
        if (!editingProductId) {
            console.log(
                "Product ID missing"
            );
            return;
        }

        try {
            const token =
                localStorage.getItem("adminToken");

            const response = await fetch(
                `http://localhost:5000/api/products/${editingProductId}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json",

                        Authorization:
                            `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        name: product.name,
                        price: Number(product.price),
                        image: product.image,
                        category: product.category
                    })
                }
            );

            const data =
                await response.json();

            if (response.ok) {

                console.log(
                    "Product updated:",
                    data
                );

                // Update product in frontend
                setProducts(
                    (previousProducts) =>
                        previousProducts.map(
                            (item) =>
                                item._id === editingProductId
                                    ? data.product
                                    : item
                        )
                );

                // Clear form
                setProduct({
                    name: "",
                    price: "",
                    image: "",
                    category: ""
                });

                // Exit edit mode
                setEditingProductId(null);

                // Close form
                setShowProductForm(false);

            } else {
                console.log(
                    "Error:",
                    data.message
                );
            }

        } catch (error) {
            console.log(
                "Error updating product:",
                error
            );
        }
    };


    // =========================
    // CANCEL EDIT
    // =========================

    const cancelEdit = () => {
        setEditingProductId(null);

        setProduct({
            name: "",
            price: "",
            image: "",
            category: ""
        });

        setShowProductForm(false);
    };


    // =========================
    // PENDING ORDERS
    // =========================

    const pendingOrders =
        (orders || []).filter(
            (order) =>
                order.status === "Pending"
        );


    // =========================
    // UI
    // =========================

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            {/* =========================
                PAGE TITLE
            ========================= */}

            <div className="flex justify-between items-center mb-6">

                <h1 className="text-3xl font-bold text-gray-900">
                    Admin Dashboard
                </h1>

                <button
                    onClick={() => {

                        // If currently editing,
                        // don't switch directly
                        // to Add mode

                        if (editingProductId) {
                            cancelEdit();
                            return;
                        }

                        setShowProductForm(
                            !showProductForm
                        );
                    }}
                    className="bg-black text-white px-5 py-3 rounded-lg font-semibold hover:bg-gray-800"
                >
                    {showProductForm && !editingProductId
                        ? "Close"
                        : "+ Add Product"}
                </button>

            </div>


            {/* =========================
                ADD / EDIT PRODUCT FORM
            ========================= */}

            {showProductForm && (
                <form
                    onSubmit={
                        editingProductId
                            ? updateProduct
                            : addProduct
                    }
                    className="bg-white rounded-xl shadow p-6 mb-8"
                >

                    <h2 className="text-2xl font-bold text-gray-900 mb-5">
                        {editingProductId
                            ? "Edit Product"
                            : "Add New Product"}
                    </h2>


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* =========================
                            PRODUCT NAME
                        ========================= */}

                        <input
                            type="text"
                            placeholder="Product Name"

                            value={product.name}

                            onChange={(e) =>
                                setProduct({
                                    ...product,
                                    name: e.target.value
                                })
                            }

                            className="border rounded-lg px-4 py-3 text-gray-800"

                            required
                        />


                        {/* =========================
                            PRICE
                        ========================= */}

                        <input
                            type="number"
                            placeholder="Price"

                            value={product.price}

                            onChange={(e) =>
                                setProduct({
                                    ...product,
                                    price: e.target.value
                                })
                            }

                            className="border rounded-lg px-4 py-3 text-gray-800"

                            min="0"

                            required
                        />


                        {/* =========================
                            IMAGE
                        ========================= */}

                        <input
                            type="text"
                            placeholder="Image URL / Path"

                            value={product.image}

                            onChange={(e) =>
                                setProduct({
                                    ...product,
                                    image: e.target.value
                                })
                            }

                            className="border rounded-lg px-4 py-3 text-gray-800"

                            required
                        />


                        {/* =========================
                            CATEGORY
                        ========================= */}

                        <input
                            type="text"
                            placeholder="Category"

                            value={product.category}

                            onChange={(e) =>
                                setProduct({
                                    ...product,
                                    category: e.target.value
                                })
                            }

                            className="border rounded-lg px-4 py-3 text-gray-800"

                            required
                        />

                    </div>


                    {/* =========================
                        FORM BUTTONS
                    ========================= */}

                    <div className="flex gap-3 mt-5">

                        <button
                            type="submit"
                            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700"
                        >
                            {editingProductId
                                ? "Update Product"
                                : "Add Product"}
                        </button>


                        {editingProductId && (
                            <button
                                type="button"
                                onClick={cancelEdit}
                                className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                        )}

                    </div>

                </form>
            )}


            {/* =========================
                DASHBOARD CARDS
            ========================= */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

                {/* TOTAL ORDERS */}

                <div className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-gray-700 font-semibold text-lg">
                        Total Orders
                    </h2>

                    <p className="text-3xl font-bold mt-2 text-gray-900">
                        {(orders || []).length}
                    </p>

                </div>


                {/* PENDING ORDERS */}

                <div className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-gray-700 font-semibold text-lg">
                        Pending Orders
                    </h2>

                    <p className="text-3xl font-bold mt-2 text-gray-900">
                        {pendingOrders.length}
                    </p>

                </div>


                {/* TOTAL PRODUCTS */}

                <div className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-gray-700 font-semibold text-lg">
                        Total Products
                    </h2>

                    <p className="text-3xl font-bold mt-2 text-gray-900">
                        {products.length}
                    </p>

                </div>

            </div>


            {/* =========================
                PRODUCTS SECTION
            ========================= */}

            <div className="bg-white rounded-xl shadow p-6 mb-8">

                <div className="flex justify-between items-center mb-6">

                    <h2 className="text-2xl font-bold text-gray-900">
                        Products
                    </h2>

                    <span className="text-gray-500">
                        {products.length} Products
                    </span>

                </div>


                {products.length === 0 ? (

                    <p className="text-gray-500">
                        No products found.
                    </p>

                ) : (

                    <div className="space-y-4">

                        {products.map(
                            (product) => (

                                <div
                                    key={product._id}
                                    className="flex flex-col md:flex-row md:items-center md:justify-between border rounded-lg p-4 gap-4"
                                >

                                    {/* =========================
                                        PRODUCT INFO
                                    ========================= */}

                                    <div className="flex items-center gap-4">

                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-16 h-16 object-cover rounded-lg"
                                        />

                                        <div>

                                            <h3 className="font-semibold text-lg text-gray-900">
                                                {product.name}
                                            </h3>

                                            <p className="text-gray-500">
                                                ₹{product.price}
                                            </p>

                                            <p className="text-sm text-gray-400">
                                                {product.category}
                                            </p>

                                        </div>

                                    </div>


                                    {/* =========================
                                        ACTIONS
                                    ========================= */}

                                    <div className="flex gap-2">

                                        {/* EDIT */}

                                        <button
                                            type="button"
                                            onClick={() =>
                                                editProduct(product)
                                            }
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                        >
                                            Edit
                                        </button>


                                        {/* DELETE */}

                                        <button
                                            type="button"
                                            onClick={() =>
                                                deleteProduct(
                                                    product._id
                                                )
                                            }
                                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>

                            )
                        )}

                    </div>

                )}

            </div>


            {/* =========================
                ORDERS SECTION
            ========================= */}

            <div className="bg-white rounded-xl shadow p-6">

                <h2 className="text-2xl font-bold text-gray-900 mb-5">
                    Recent Orders
                </h2>


                {/* =========================
                    LOADING
                ========================= */}

                {loading ? (

                    <p className="text-gray-700 font-semibold">
                        Loading orders...
                    </p>

                ) : (orders || []).length === 0 ? (

                    /* =========================
                        NO ORDERS
                    ========================= */

                    <p className="text-gray-700 font-semibold">
                        No orders found
                    </p>

                ) : (

                    /* =========================
                        ORDERS LIST
                    ========================= */

                    <div className="space-y-4">

                        {orders.map(
                            (order) => (

                                <div
                                    key={order._id}
                                    className="border rounded-lg p-4"
                                >

                                    {/* =========================
                                        CUSTOMER + AMOUNT
                                    ========================= */}

                                    <div className="flex justify-between items-start">

                                        {/* CUSTOMER */}

                                        <div>

                                            <h3 className="font-bold text-lg text-gray-900">
                                                {order.customer.name}
                                            </h3>

                                            <p className="text-gray-700 font-medium">
                                                Phone:{" "}
                                                {order.customer.phone}
                                            </p>

                                            <p className="text-gray-700 font-medium">
                                                Address:{" "}
                                                {order.customer.address}
                                            </p>

                                        </div>


                                        {/* =========================
                                            AMOUNT + STATUS
                                        ========================= */}

                                        <div className="text-right">

                                            <p className="font-bold text-lg text-gray-900">
                                                ₹{order.totalAmount}
                                            </p>


                                            {/* STATUS */}

                                            <select
                                                value={order.status}

                                                onChange={(e) =>
                                                    updateOrderStatus(
                                                        order._id,
                                                        e.target.value
                                                    )
                                                }

                                                className="border rounded-lg px-3 py-2 mt-2 text-gray-800 bg-white"
                                            >

                                                <option value="Pending">
                                                    Pending
                                                </option>

                                                <option value="Accepted">
                                                    Accepted
                                                </option>

                                                <option value="Preparing">
                                                    Preparing
                                                </option>

                                                <option value="Out for Delivery">
                                                    Out for Delivery
                                                </option>

                                                <option value="Delivered">
                                                    Delivered
                                                </option>

                                                <option value="Cancelled">
                                                    Cancelled
                                                </option>

                                            </select>

                                        </div>

                                    </div>


                                    {/* =========================
                                        ORDER ITEMS
                                    ========================= */}

                                    <div className="mt-4">

                                        {order.items.map(
                                            (item) => (

                                                <div
                                                    key={item._id}
                                                    className="flex justify-between border-t pt-3 mt-3"
                                                >

                                                    <span className="font-semibold text-gray-800">
                                                        {item.name}
                                                    </span>

                                                    <span className="font-semibold text-gray-800">
                                                        ×{" "}
                                                        {item.quantity}
                                                    </span>

                                                </div>

                                            )
                                        )}

                                    </div>

                                </div>

                            )
                        )}

                    </div>

                )}

            </div>

        </div>
    );
}