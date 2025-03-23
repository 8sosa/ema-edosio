import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import FilmManager from "@/components/FilmManager";

export default async function AdminPanelPage() {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      {/* FilmManager is a client component for managing films */}
      <FilmManager />
      {/* You can add more admin components here (e.g., event management, user management) */}
    </div>
  );
}
