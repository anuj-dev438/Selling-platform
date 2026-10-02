import shopConfig from "../Data/ShopConfig";
export default function Footer(){
    
  const handleOrder = () => {
    const message = `Hello ${shopConfig.name}, I want to place an order.`;

    const url = `https://wa.me/${shopConfig.whatsapp}?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank");
  };
  return(

   <footer
        id="contact"
        className="border-t border-gray-200 bg-gray-900 px-5 py-8 text-white"
      >
        <div className="mx-auto max-w-6xl text-center">

          <h3 className="text-xl font-bold">
            {shopConfig.name}
          </h3>

          <p className="mt-2 text-sm text-gray-400">
            {shopConfig.address}
          </p>

          <p className="mt-1 text-sm text-gray-400">
            {shopConfig.phone}
          </p>

          <p className="mt-5 text-xs text-gray-500">
            © 2026 {shopConfig.name}. All rights reserved.
          </p>

        </div>
      </footer>
      )
}