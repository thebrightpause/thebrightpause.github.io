import { THE_BRIGHT_PAUSE } from "../constants";

export const metadata = {
    title: "Breathe | The Bright Pause",
    description: "A quick breathing break by thebrightpause",
    openGraph: {
        title: "Breathe | The Bright Pause",
        description: "A quick breathing break by thebrightpause",
        images: [THE_BRIGHT_PAUSE.image],
    },
    twitter: {
        card: "summary_large_image",
        url: `${THE_BRIGHT_PAUSE.url}/breathe`,
        site: "@thebrightpause",
        title: "Breathe | The Bright Pause",
        description: "A quick breathing break by thebrightpause",
        images: [THE_BRIGHT_PAUSE.image],
    },
};

export default function BreatheLayout({ children }) {
    return children;
}