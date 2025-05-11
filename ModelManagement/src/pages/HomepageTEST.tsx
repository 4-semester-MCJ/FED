import React from "react";
import Button from "@/components/buttons/standard_button";
import { Route, useNavigate } from "react-router-dom";
import { getAllJobs } from "@/services/api";

const Homepage: React.FC = () => {
	const navigate = useNavigate();

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
				<div>
					<Button
						apiCall={() => getAllJobs()}
						onSuccess={(data) => {
							console.log("API Response:", data);
							navigate("/about");
						}}
						to="/Jobs"
					>
						Get Job
					</Button>
				</div>
			</main>

			<footer className="mt-10 text-sm text-gray-500">
				© {new Date().getFullYear()} Model Management APS
			</footer>
		</div>
	);
};

export default Homepage;
