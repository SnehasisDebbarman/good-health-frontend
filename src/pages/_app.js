import "@/styles/globals.css";
import { RecoilRoot } from "recoil";
// pages/_app.js
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
import Navbar from "@/Components/Navbar";

export default function App({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <Navbar />
      <Component {...pageProps} />
    </RecoilRoot>
  );
}
