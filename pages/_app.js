// pages/_app.js
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
// if you created a globals.css, import it here
// import "../styles/globals.css";

import { useEffect } from "react";

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // only runs in the browser
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return <Component {...pageProps} />;
}
