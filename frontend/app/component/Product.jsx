"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import categories from "../Data/categories";
import Cart from "./Cart";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState([]);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/products"
        );

        const data = await response.json();

        if (response.ok) {
          setProducts(data.products || []);
        } else {
          console.log("Product fetch failed:", data.message);
        }
      } catch (error) {
        console.log("Product fetch error:", error);
      }
    };

    fetchProducts();
  }, []);

  // Filter Products
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          (product) => product.category === selectedCategory
        );

  // Add To Cart
  const addToCart = (product) => {
    const existingProduct = cart.find(
      (item) => item._id === product._id
    );

    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }
  };

  // Increase Quantity
  const increaseQuanitity = (productId) => {
    setCart(
      cart.map((item) =>
        item._id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrease Quantity
  const decreaseQuantity = (productId) => {
    setCart(
      cart.map((item) =>
        item._id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Remove Cart Item
  const removeFromCart = (productId) => {
    setCart(
      cart.filter((item) => item._id !== productId)
    );
  };

  return (
    <section id="menu" className="py-12">

      {/* Heading */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-800 sm:text-xl">
          Our Menu
        </h2>

        <p className="mt-1 text-gray-500">
          Delicious food made fresh for you
        </p>
      </div>

      {/* Category Buttons */}
      <div className="mb-8 flex gap-3 overflow-x-auto pb-2">

        {/* All Button */}
        <button
          onClick={() => setSelectedCategory("All")}
          className={`whitespace-nowrap rounded-full px-5 py-2 font-medium transition ${
            selectedCategory === "All"
              ? "bg-orange-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-orange-100"
          }`}
        >
          All
        </button>

        {/* Category Buttons */}
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.name)}
            className={`whitespace-nowrap rounded-full px-5 py-2 font-medium transition ${
              selectedCategory === category.name
                ? "bg-orange-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-orange-100"
            }`}
          >
            {category.name}
          </button>
        ))}

      </div>

      {/* Products */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >

            {/* Product Image */}
            <div className="relative h-52 w-full bg-gray-100">

              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />

            </div>

            {/* Product Details */}
            <div className="p-5">

              <div className="flex items-start justify-between gap-3">

                <h3 className="text-lg font-bold text-gray-800">
                  {product.name}
                </h3>

                <span className="whitespace-nowrap font-bold text-orange-600">
                  ₹{product.price}
                </span>

              </div>

              <p className="mt-2 text-sm text-gray-500">
                {product.description}
              </p>

              {/* Add To Cart */}
           <button
    onClick={() => {
        addToCart(product);
        alert(`${product.name} added to cart!`);
    }}
    className="mt-4 w-full rounded-lg bg-orange-600 py-3 font-semibold text-white transition hover:bg-orange-700"
>
    Add to Cart
</button>
</div>
          </div>
        ))}

      </div>

      {/* No Products */}
      {filteredProducts.length === 0 && (
        <div className="py-10 text-center text-gray-500">
          No products available in this category.
        </div>
      )}

      {/* Cart */}
      <Cart
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuanitity}
        decreaseQuantity={decreaseQuantity}
      />

    </section>
  );
}