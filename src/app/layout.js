import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata = {
  title: "Portofolio | Choirul Amir Siregar",
  description: "Data enthusiast and IT student",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} h-full antialiased dark`}>
      <body className="min-h-full flex flex-col font-sans bg-[#111111] text-white overflow-x-hidden selection:bg-purple-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
