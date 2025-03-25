// import NewsletterSection from '@/components/NewsletterSection';
// import "../app/styles/home.css";
import Link from "next/link";
import Image from "next/image";
import Home from '../images/home.jpg'
import FCarousel from "@/components/filmCarousel"


export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <p className="hero-subtitle">Ema Edosio Deelen</p>
          <h1 className="hero-title">Cinema That Speaks.</h1>
          <h2 className="hero-training">Stories That Stay With You.</h2>
          <p className="hero-description">
            Authentic, bold, and deeply human storytelling.
          </p>
          <Link href="/about">
            <button className="cta-button">SEE ME</button>
          </Link>   
        </div>
        <div className="hero-image">
          <Image src={Home} alt="Woman in a metallic jacket" />
        </div>
      </section>

      <FCarousel />
    </>
  );
}
