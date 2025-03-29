import Image from "next/image";
import './page.css'

export default function HomePage() {
  return (
    <>
      <section className="relative w-full h-[90vh] bg-black overflow-hidden">
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
        <div className="absolute inset-0 overlay" />
        {/* Content */}
        <div className="relative z-10 flex flex-col items-start justify-center h-full max-w-5xl mx-auto px-6">
          <h1 className="text-3xl md:text-5xl font-bold mb-2 title">
            Jackets are like wigs.
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-xl mb-4 body">
            Urban style redefined. Stay comfortable and trendy with our latest collection.
          </p>
          <button className=" text bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition">
            Discover Now
          </button>
        </div>
      </section>

      {/* NEW ARRIVALS SECTION */}
      <section className="py-12 px-6 max-w-8xl">
        <h2 className="title text-2xl md:text-3xl font-bold mb-6 text-center">
          New Arrivals
        </h2>
        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
          {/* Repeat for each product */}
          {Array.from({ length: 8 }).map((_, idx) => (
            <div key={idx} className="flex flex-col w-full">
              <div className="relative w-full aspect-[1/1] bg-gray-100 rounded">
                <Image
                  src="/images/ph.png"
                  alt={`Product ${idx + 1}`}
                  fill
                  className="object-cover object-center rounded"
                />
              </div>
              <div className="mt-2">
                <h3 className="text-md font-semibold text">Product Name</h3>
                <p className="text-sm text-gray-500 body">$39.99</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      </>
  );
}
