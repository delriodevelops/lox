import "./globals.css";
import { GlobalProvider } from "../context/globalContext";
export default function RootLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<GlobalProvider>
			<html lang="en">
				{/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
				<head />
				<body>{children}</body>
			</html>
		</GlobalProvider>
	);
}
