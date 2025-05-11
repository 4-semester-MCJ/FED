import React from "react";

const Homepage: React.FC = () => {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-900">
			<header className="text-center p-6">
				<h1 className="text-4xl font-bold mb-4">
					Welcome to My Bun + React App
				</h1>
				<p className="text-lg">
					This is the homepage built using Bun and React.
				</p>
			</header>

			<main className="flex flex-col items-center space-y-4">
				<a
					href="/about"
					className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
				>
					Go to About Page
				</a>
				<a
					href="/contact"
					className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
				>
					Contact Us
				</a>
			</main>

			<footer className="mt-10 text-sm text-gray-500">
				© {new Date().getFullYear()} Your App Name
			</footer>
		</div>
	);
};

export default Homepage;
