import Script from "next/script";
import "./globals.css";
import { THE_BRIGHT_PAUSE } from "./constants";
import { thebrightpause } from "./fonts";

export const metadata = {
	metadataBase: new URL(THE_BRIGHT_PAUSE.url),
	title: THE_BRIGHT_PAUSE.title,
	description: THE_BRIGHT_PAUSE.description,
	alternates: {
		canonical: "/",
	},
	openGraph: {
		type: "website",
		url: THE_BRIGHT_PAUSE.url,
		siteName: THE_BRIGHT_PAUSE.title,
		title: THE_BRIGHT_PAUSE.title,
		description: THE_BRIGHT_PAUSE.description,
		images: [{ url: THE_BRIGHT_PAUSE.image, width: 1200, height: 630 }],
	},
	twitter: {
		card: "summary_large_image",
		site: "@thebrightpause",
		title: THE_BRIGHT_PAUSE.title,
		description: THE_BRIGHT_PAUSE.description,
		images: [THE_BRIGHT_PAUSE.image],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: { index: true, follow: true },
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" className={thebrightpause.variable}>
			<body>
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
