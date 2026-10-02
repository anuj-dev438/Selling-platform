"use client";

import categories from "../Data/categories";
import Image from "next/image";

export default function Categories() {
  return (
    <section className="py-10">

      {/* Heading */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-800 sm:text-xl">
          Explore Categories
        </h2>

        <p className="mt-1 text-gray-500">
          Choose your favourite food
        </p>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">

        {categories.map((category) => (
          <div
            key={category.id}
            className="group cursor-pointer"
          >

            <div className="relative aspect-square overflow-hidden rounded-full bg-gray-100">

              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-contain transition-transform duration-300 rounded-full group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 rounded-full bg-black/10 transition group-hover:bg-black/20"></div>

            </div>

            <h3 className="mt-3 text-center font-semibold text-gray-800 transition group-hover:text-orange-500">
              {category.name}
            </h3>

          </div>
        ))}

      </div>
    </section>
  );
}