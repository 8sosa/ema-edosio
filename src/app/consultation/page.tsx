// import React from "react";
// import Link from "next/link";


// export default function ContactPage() {
//   return (
//     <div className="bg-white text-gray-800">
//       {/* Hero Section */}
//       <section className="relative w-full bg-black text-white flex flex-col items-center py-30 px-4 my-10 md:px-8">
//         <div className="max-w-5xl w-full text-center">
//           <h1 className="text-3xl md:text-5xl font-bold mb-4 uppercase">
//             Master the Art of Filmmaking.
//             <br />
//             Create Stories That Move.
//           </h1>
//           <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
//             Dive into immersive classes taught by renowned filmmakers.
//             Transform your vision into compelling films—one scene at a time.
//           </p>
//           <Link href="/classes" className="bg-red-600 hover:bg-red-700 transition px-8 py-3 rounded-full text-lg font-semibold">
//             Start Your Journey
//           </Link>
//         </div>
//       </section>

//       {/* Hero Section */}
//       <section className="relative bg-black text-white py-20 px-4 text-center">
//         <div className="absolute inset-0 bg-black bg-opacity-60"></div>
//         <Image
//           src="/hero-image.jpg"
//           alt="Filmmaking Hero"
//           className="absolute inset-0 object-cover w-full h-full opacity-30"
//         />
//         <div className="relative z-10 max-w-4xl mx-auto">
//           <h1 className="text-4xl font-bold mb-4">Book a Filmmaking Consultation</h1>
//           <p className="text-lg">
//             Ready to elevate your film? Get tailored guidance at every stage—from concept to final cut.
//           </p>
//         </div>
//       </section>

//       {/* Contact Info + Form */}
//       <section className="py-20 px-4 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
//         <div>
//           <h2 className="text-3xl font-bold mb-6">Let’s Bring Your Story to Life</h2>
//           <p className="text-gray-600 mb-6">
//             Whether you're crafting a short, documentary, or feature film, I offer personalized consultations for directors, producers, and creative teams.
//           </p>
//           <ul className="space-y-4">
//             <li className="flex items-start gap-4">
//               <span className="text-green-500">●</span>
//               <div>
//                 <p className="font-semibold">Phone</p>
//                 <p>(800) 987 654 321</p>
//               </div>
//             </li>
//             <li className="flex items-start gap-4">
//               <span className="text-green-500">●</span>
//               <div>
//                 <p className="font-semibold">Availability</p>
//                 <p>Mon–Fri: 10AM – 6PM</p>
//               </div>
//             </li>
//             <li className="flex items-start gap-4">
//               <span className="text-green-500">●</span>
//               <div>
//                 <p className="font-semibold">Studio</p>
//                 <p>Studio 8, Downtown LA, California</p>
//               </div>
//             </li>
//           </ul>
//         </div>

//         <form className="bg-green-50 rounded-2xl p-8 shadow">
//           <div className="mb-4">
//             <label className="block font-semibold mb-1">Name</label>
//             <input type="text" className="w-full px-4 py-2 rounded border" />
//           </div>
//           <div className="mb-4">
//             <label className="block font-semibold mb-1">Email</label>
//             <input type="email" className="w-full px-4 py-2 rounded border" />
//           </div>
//           <div className="mb-4">
//             <label className="block font-semibold mb-1">Tell Me About Your Project</label>
//             <textarea className="w-full px-4 py-2 rounded border h-32" placeholder="Share your vision, goals, or challenges..."></textarea>
//           </div>
//           <button
//             type="submit"
//             className="bg-lime-500 text-white px-6 py-2 rounded hover:bg-lime-600"
//           >
//             SEND INQUIRY
//           </button>
//         </form>
//       </section>

//       {/* Stats Section */}
//       <section className="py-20 px-4 bg-white max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
//         <img
//           src="/film-stats.jpg"
//           alt="Filmmaking Stats"
//           className="rounded-xl w-full h-auto object-cover"
//         />
//         <div>
//           <h2 className="text-2xl font-bold mb-4">Trusted by Filmmakers Worldwide</h2>
//           <p className="text-gray-600 mb-6">
//             Tap into real-world production expertise and story-driven strategy honed across formats and genres.
//           </p>
//           <div className="grid grid-cols-2 gap-4 text-center">
//             <div>
//               <p className="text-2xl font-bold">50+</p>
//               <p className="text-sm text-gray-600">Projects Consulted</p>
//             </div>
//             <div>
//               <p className="text-2xl font-bold">30+</p>
//               <p className="text-sm text-gray-600">Awards & Nominations</p>
//             </div>
//             <div>
//               <p className="text-2xl font-bold">100+</p>
//               <p className="text-sm text-gray-600">Screenplays Reviewed</p>
//             </div>
//             <div>
//               <p className="text-2xl font-bold">15 Years</p>
//               <p className="text-sm text-gray-600">Industry Experience</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* FAQ Section */}
//       <section className="py-20 px-4 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
//         <div>
//           <h2 className="text-2xl font-bold mb-6">FAQs</h2>
//           <ul className="space-y-4">
//             {[
//               "What types of film projects do you consult on?",
//               "Can you help with production planning and budgets?",
//               "Do you provide script coverage or feedback?",
//               "Are consultations available remotely?",
//             ].map((q, i) => (
//               <li key={i} className="bg-gray-100 p-4 rounded-md">
//                 {q}
//               </li>
//             ))}
//           </ul>
//         </div>
//         <img
//           src="/director-chair.jpg"
//           alt="Director at work"
//           className="rounded-xl w-full h-auto object-cover"
//         />
//       </section>
//     </div>
//   );
// }
