'use client';

import { use, useEffect, useState } from "react";
import Cards from "./components/cards";
import Footer from "./components/footer";
import Header from "./components/header";
import Hero from "./components/hero";
import { useRouter } from "next/navigation";

export default function Home() {

  const [token, setToken] =  useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const checkToken = async () => {

    try {
      const response = await fetch('http://localhost:8000/check-token/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Token is valid:", data);

        if (data.status === "success") {

          if (data.onboarding == "complete") {
            router.push("/dashboard");
          } else {
            router.push("/onboarding");
          }
        }
      } else {

        // console.error("Token is invalid:", data);
        // do nothing

      }

    } catch (error) {
      console.error("Error checking token:", error);
    }
  }

  useEffect(() => {
    if (token) {
      checkToken();
    }
  }, [token]);

  return (
    <div>
      <Header />
      <Hero />
      <Cards />
      <Footer />
    </div>

  );
}
