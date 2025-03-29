import Image from "next/image";
import './page.css'

export default function HomePage() {
  return (
    <>
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
