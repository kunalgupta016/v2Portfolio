import { Sora, Inter } from "next/font/google";
import Script from "next/script"; // <-- Isko import kiya hai
import LenisWrapper from "./components/LenisWrapper";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Kunal Gupta | Developer Portfolio",
  description:
    "Full Stack Developer & Game Creator — building modern web apps and interactive games.",
  icons: {
    icon: "/icon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable}`}>
      <body style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
        <LenisWrapper>{children}</LenisWrapper>

        {/* --- CHATBASE SCRIPT START --- */}
        <Script id="chatbase-script" strategy="lazyOnload">
          {`
            (function(){if(!window.chatbase||window.chatbase("getState")!=="initialized"){window.chatbase=(...arguments)=>{if(!window.chatbase.q){window.chatbase.q=[]}window.chatbase.q.push(arguments)};window.chatbase=new Proxy(window.chatbase,{get(target,prop){if(prop==="q"){return target.q}return(...args)=>target(prop,...args)}})}const onLoad=function(){const script=document.createElement("script");script.src="https://www.chatbase.co/embed.min.js";script.id="jYP_eJcjiQESniY7UCSCj";script.domain="www.chatbase.co";document.body.appendChild(script)};if(document.readyState==="complete"){onLoad()}else{window.addEventListener("load",onLoad)}})();
          `}
        </Script>
        {/* --- CHATBASE SCRIPT END --- */}

      </body>
    </html>
  );
}
