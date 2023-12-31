"use client";
import { useEffect } from "react";
import "./globals.scss";

// Services
import AutoLoadService from "@Services/AutoLoad";

export default function RootLayout({ children }: { children: React.ReactNode }) {
	useEffect(() => {
		AutoLoadService.load();
	}, []);

	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
