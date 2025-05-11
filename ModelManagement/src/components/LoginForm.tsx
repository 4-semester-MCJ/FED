import React, { useState } from "react";
import { login, setAuthToken } from "../services/api";

const LoginForm: React.FC = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			// Kald login-funktionen fra API-servicen
			const { token, role } = await login(username, password);

			// Gem JWT-token og rolle i localStorage
			localStorage.setItem("token", token);
			localStorage.setItem("role", role);

			// Sæt token i API-headers
			setAuthToken(token);

			// Redirect baseret på rolle
			if (role === "manager") {
				window.location.href = "/manager-dashboard";
			} else if (role === "model") {
				window.location.href = "/model-dashboard";
			}
		} catch (err) {
			setError("Login failed. Please check your credentials.");
		}
	};

	return (
		<form onSubmit={handleSubmit} className="login-form">
			<h2>Login</h2>
			{error && <p className="error">{error}</p>}
			<input
				type="text"
				placeholder="Username"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				required
			/>
			<input
				type="password"
				placeholder="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				required
			/>
			<button type="submit">Login</button>
		</form>
	);
};

export default LoginForm;
