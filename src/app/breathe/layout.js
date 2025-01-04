export const metadata = {
	title: "Breathe",
	description: "A quick breathing break by thebrightpause",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
