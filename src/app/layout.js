import Script from "next/script";
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
    images: [THE_BRIGHT_PAUSE.image],
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
      images: [THE_BRIGHT_PAUSE.image],
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${thebrightpause.variable}`}>
        {children}
        <Script
          id="gtm-1"
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-75TLWG2RC0"
        />
        <Script
          id="gtm-2"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-75TLWG2RC0');`,
          }}
        />
      </body>
    </html>
  );
}
