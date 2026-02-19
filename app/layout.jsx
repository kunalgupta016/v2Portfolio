import { Sora, Inter } from "next/font/google";
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
      </body>
    </html>
  );
}
