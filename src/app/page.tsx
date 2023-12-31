import { Metadata } from "next";

// Components
import Home from "@Components/Pages/Home";

export const metadata: Metadata = {
	title: "Pixara",
	description: "Réseau social pour les photographes professionnels.",
};

export default async function Page() {
	return <Home />;
}
