import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <section className="relative w-full h-[80vh] bg-gray-100 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/ph.png"
            alt="Hero Image"
            fill
            className="object-cover object-center"
          />
        </div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-white bg-opacity-10" />
        {/* Content */}
        <div className="relative z-10 flex flex-col items-start justify-center h-full max-w-5xl mx-auto px-6">
          <h1 className="text-3xl md:text-5xl font-bold mb-2">
            Jackets for the Modern Man
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-xl mb-4">
            Urban style redefined. Stay comfortable and trendy with our latest collection.
          </p>
          <button className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition">
            Discover Now
          </button>
        </div>
      </section>

      {/* NEW ARRIVALS SECTION */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
          New Arrivals
        </h2>

        {/* Category Tabs */}
        <div className="flex items-center justify-center space-x-6 mb-8 text-gray-500">
          <button className="hover:text-black">Women</button>
          <button className="hover:text-black">Men</button>
          <button className="hover:text-black">Kids</button>
          <button className="hover:text-black">Accessories</button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Repeat for each product */}
          {Array.from({ length: 8 }).map((_, idx) => (
            <div key={idx} className="flex flex-col">
              <div className="relative w-full h-64 bg-gray-100 rounded">
                <Image
                  src="/images/ph.png"
                  alt={`Product ${idx + 1}`}
                  fill
                  className="object-cover object-center rounded"
                />
              </div>
              <div className="mt-2">
                <h3 className="text-sm font-semibold">Product Name</h3>
                <p className="text-sm text-gray-500">$39.99</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED SECTIONS */}
      <section className="bg-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row gap-6">
          {/* Left Feature */}
          <div className="flex-1 bg-white rounded shadow p-6 flex flex-col justify-center items-start">
            <h3 className="text-xl md:text-2xl font-bold mb-2">
              Where Dreams Meet Couture
            </h3>
            <p className="text-gray-700 mb-4">
              Elevate your wardrobe with our premium collection that merges comfort and style.
            </p>
            <button className="border border-black px-6 py-2 rounded-full hover:bg-black hover:text-white transition">
              Shop Now
            </button>
          </div>

          {/* Right Feature */}
          <div className="flex-1 bg-white rounded shadow p-6 flex flex-col justify-center items-start">
            <h3 className="text-xl md:text-2xl font-bold mb-2">
              Chic Footwear for City Living
            </h3>
            <p className="text-gray-700 mb-4">
              Step out in confidence with our latest shoe arrivals—designed to handle every stride.
            </p>
            <button className="border border-black px-6 py-2 rounded-full hover:bg-black hover:text-white transition">
              Shop Now
            </button>
          </div>
        </div>
      </section>

      {/* SALE BANNER SECTION */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <div className="relative w-full h-60 bg-gray-200 rounded overflow-hidden flex items-center justify-center">
          <Image
            src="/images/ph.png"
            alt="Sale Banner"
            fill
            className="object-cover object-center opacity-80"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20" />
          <div className="relative z-10 text-center text-white">
            <h3 className="text-4xl font-bold mb-2">Trendsetting Bags for Her</h3>
            <p className="text-xl">Up to 50% Off</p>
          </div>
        </div>
      </section>
      </>
  );
}
