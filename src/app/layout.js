import localFont from "next/font/local";
import "./globals.css";
import { THE_BRIGHT_PAUSE } from "./constants";

const thebrightpause = localFont({
  src: "./fonts/Oxygen.ttf",
  variable: "--font-the-bright-pause",
  weight: "100 900",
});

export const metadata = {
  title: THE_BRIGHT_PAUSE.title,
  description: THE_BRIGHT_PAUSE.description,
  openGraph: {
    title: THE_BRIGHT_PAUSE.title,
    description: THE_BRIGHT_PAUSE.description,
    image: THE_BRIGHT_PAUSE.image,
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
    },
    twitter: {
      card: "summary_large_image",
      url: THE_BRIGHT_PAUSE.url,
      site: "@thebrightpause",
      title: THE_BRIGHT_PAUSE.title,
      description: THE_BRIGHT_PAUSE.description,
      image: THE_BRIGHT_PAUSE.image,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${thebrightpause.variable}`}>{children}</body>
    </html>
  );
}
