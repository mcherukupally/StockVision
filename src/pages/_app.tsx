// src/pages/_app.tsx
import "@/styles/globals.css";
import "@/styles/homepage.css";
import "@/components/Navbar.css";
import "@/styles/StockPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { useEffect } from "react";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}
