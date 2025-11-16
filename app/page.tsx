'use client';

import Cards from "./components/cards";
import Footer from "./components/footer";
import Header from "./components/header";
import Hero from "./components/hero";

export default function Home() {

  return (
    <div>
      <Header />
      <Hero />
      <Cards />
      <Footer />
    </div>

  );
}
