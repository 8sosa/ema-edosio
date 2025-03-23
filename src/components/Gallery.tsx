import Image from "next/image";
import ph from "../images/ph.png"; // Import the image

export default function Gallery() {
  return (
    <section className="container mx-auto p-8">
      <div className="grid grid-cols-3 gap-4">
        {[...Array(9)].map((_, index) => (
          <div key={index} className="overflow-hidden rounded-lg shadow-lg">
            <Image 
              src={ph} 
              alt={`Gallery Image ${index + 1}`} 
              width={100} 
              height={100} 
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}