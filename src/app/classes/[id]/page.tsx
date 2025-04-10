// src/app/classes/[id]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import masterclassData from "@/components/modules.json";

type Module = {
  id: string;
  title: string;
  content: string;
};

export default async function ModulePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Await the params promise before using its properties
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const modules: Module[] = masterclassData.modules;
  const moduleData = modules.find((m) => m.id === id);

  if (!moduleData) {
    notFound();
  }

  return (
    <main className="w-full min-h-screen p-4 bg-black-200 py-25">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-md shadow-md text-black">
        <Link href="/classes" className="text-purple-700 hover:underline text">
          &larr; Back to Modules
        </Link>
          {/* Video container */}
        <div className="mt-6 relative w-full aspect-video bg-black rounded-md overflow-hidden">
          <video
            controls
            className="w-full h-full object-cover"
            src="/videos/wnh.mp4"
          >
            Your browser does not support the video tag.
          </video>
        </div>
        <h1 className="text-4xl font-bold mt-4 mb-6 title">{moduleData.title}</h1>
        <div className="prose max-w-none body">
          {moduleData.content.split("\n\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </main>
  );
}
