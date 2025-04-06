import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import './styles/globals.css'; 

export const metadata = {
  title: "Ema Edosio",
  description: "A comprehensive website showcasing films, events, masterclasses, merch, and more.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className="flex flex-col min-h-screen">
        <SessionProviderWrapper>
          <CartProvider>
            <Header />
            <main className="flex-grow siteBody">{children}</main>
          </CartProvider>
        </SessionProviderWrapper>
        <footer className="flex flex-row justify-between bg-gray-800 text-white p-4 text-center">
          <p>© {new Date().getFullYear()} Ema Edosio. </p>
          <p>All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
