
"use client";

import { useState } from "react";
import shopConfig from "../Data/ShopConfig";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOrder = () => {
    const message = `Hello ${shopConfig.name}, I want to place an order.`;

    const url = `https://wa.me/${shopConfig.whatsapp}?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank");
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-md">
      <nav>
        <div className="mx-auto max-w-7xl px-5 lg:px-8">

          {/* Top Navbar */}
          <div className="flex h-16 items-center justify-between">

            {/* Logo */}
            <a
              href="#home"
              onClick={closeMenu}
              className="group flex items-center gap-2"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-600 text-lg shadow-sm transition group-hover:scale-105">
                🍔
              </div>

              <div>
                <h1 className="text-lg font-bold leading-tight text-gray-900">
                  {shopConfig.name}
                </h1>

                <p className="hidden text-[11px] text-gray-500 sm:block">
                  Fresh • Tasty • Delicious
                </p>
              </div>
            </a>

            {/* Desktop Menu */}
            <div className="hidden items-center gap-8 md:flex">

              <a
                href="#home"
                className="text-sm font-medium text-gray-600 transition hover:text-orange-600"
              >
                Home
              </a>

              <a
                href="#menu"
                className="text-sm font-medium text-gray-600 transition hover:text-orange-600"
              >
                Menu
              </a>

              <a
                href="#about"
                className="text-sm font-medium text-gray-600 transition hover:text-orange-600"
              >
                About
              </a>

              <a
                href="#contact"
                className="text-sm font-medium text-gray-600 transition hover:text-orange-600"
              >
                Contact
              </a>

              <button
                onClick={handleOrder}
                className="rounded-xl bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-orange-700 hover:shadow-md"
              >
                Order Now
              </button>

            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-700 transition hover:bg-gray-100 md:hidden"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <span className="text-2xl">✕</span>
              ) : (
                <span className="text-2xl">☰</span>
              )}
            </button>

          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="border-t border-gray-100 py-4 md:hidden">

              <div className="flex flex-col gap-1">

                <a
                  href="#home"
                  onClick={closeMenu}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-orange-50 hover:text-orange-600"
                >
                  Home
                </a>

                <a
                  href="#menu"
                  onClick={closeMenu}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-orange-50 hover:text-orange-600"
                >
                  Menu
                </a>

                <a
                  href="#about"
                  onClick={closeMenu}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-orange-50 hover:text-orange-600"
                >
                  About
                </a>

                <a
                  href="#contact"
                  onClick={closeMenu}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-orange-50 hover:text-orange-600"
                >
                  Contact
                </a>

                {/* Mobile Order */}
                <button
                  onClick={handleOrder}
                  className="mt-2 rounded-xl bg-orange-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-700"
                >
                  Order Now
                </button>

              </div>

            </div>
          )}

        </div>
      </nav>
    </header>
  );
}


