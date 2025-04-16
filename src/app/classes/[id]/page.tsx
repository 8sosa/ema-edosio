// src/app/classes/[id]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import masterclassData from "@/components/modules.json";
import { Metadata } from "next";
import MasterclassPaywall from "@/components/MasterclassPaywall";

export function generateStaticParams(): { id: string }[] {
  return masterclassData.modules.map((m) => ({ id: m.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const mod = masterclassData.modules.find((m) => m.id === id);
  if (!mod) return { title: "Module Not Found" };
  return {
    title: mod.title,
    description: mod.intro.replace(/\n/g, " "),
  };
}

export const revalidate = 3600;

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ModulePage({ params }: Props) {
  const { id } = await params;
  const moduleData = masterclassData.modules.find((m) => m.id === id);
  if (!moduleData) notFound();

  return (
    <main className="container mx-auto py-30 px-4 bg-black text-gray-900">
      <div className="bg-white py-15 p-6 md:p-10 rounded-lg shadow-lg">
        <Link
          href="/classes"
          className="body text-purple-600 hover:underline text-sm"
        >
          ← Back to Modules
        </Link>

        <h1 className="title text-3xl md:text-4xl font-bold mt-4 mb-8">
          {moduleData.module}: {moduleData.title}
        </h1>

        <MasterclassPaywall moduleId={id} amount={30000}>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-2/4">
              <video
                src={moduleData.videoSrc ?? "/videos/wnh.mp4"}
                controls
                preload="metadata"
                className="w-full h-auto rounded-md"
              />
            </div>
            <div className="body w-full lg:w-2/4 prose prose-lg max-w-none">
              <p>Transcript placeholder</p>
            </div>
          </div>
        </MasterclassPaywall>
      </div>
    </main>
  );
}
