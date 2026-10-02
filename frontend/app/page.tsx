"use client";
import Image from "next/image";
import shopConfig from "./Data/ShopConfig";
 import  Header  from "./component/Header";
 import  Footer  from "./component/Footer";
 import Categories from "./component/Categories";
 import Product from "./component/Product"
export default function Home() {
  const handleOrder = () => {
    const message = `Hello ${shopConfig.name}, I want to place an order`;

    const url = `https://wa.me/${shopConfig.whatsapp}?text=${encodeURIComponent( 
      message 
    )}`; 
 
    window.open(url, "_blank"); 
  }; 
 
  return ( 
     
    <> 
   <Header /> 
   <section
  id="home"
  className="bg-gradient-to-br from-orange-50 via-white to-red-50"
>
  <div className="mx-auto flex max-w-7xl flex-col items-center gap-10 px-5 py-12 md:flex-row md:justify-between">

    {/* Left Content */}
    <div className="flex-1">
      <span className="mb-4 inline-block rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white">
        Fresh • Tasty • Delicious
      </span>

      <h2 className="text-xl font-bold leading-tight text-gray-900 sm:text-3xl">
        {shopConfig.name}
      </h2>

      <p className="mt-5 max-w-lg text-gray-600">
        Enjoy delicious food made fresh for you. Order your favourite
        meals quickly and easily.
      </p>

      <div className="mt-5 flex flex-wrap gap-4">
        <button
          onClick={handleOrder}
          className="rounded-lg bg-orange-600 px-6 py-3 font-semibold text-white transition hover:bg-orange-700"
        >
          Order on WhatsApp
        </button>

        <a
          href="#menu"
          className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-gray-600 transition hover:bg-gray-100"
        >
          View Menu
        </a>
      </div>
    </div>

    {/* Right Image */}
    <div className="flex flex-1 justify-center md:justify-end">
      <Image
        src="/Images/Anuj.png"
        alt="Delicious food"
        width={450}
        height={400}
        className="h-auto w-[280px] object-contain sm:w-[350px] md:w-[400px]"
      />
    </div>

  </div>
</section>
     <section id="categories" className="bg-white">
        <div className="mx-auto max-w-7xl px-5">
          <Categories />
        </div>
      </section>

       <section id="Products" className="bg-white">
        <div className="mx-auto max-w-7xl px-5">
          <Product />
        </div>
      </section>

<Footer />
  </> 
  ); 
} 