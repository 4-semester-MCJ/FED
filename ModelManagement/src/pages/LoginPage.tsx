import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";
import InputField from "../components/fields/input_fields"; // Importer InputField-komponenten

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!username || !password) {
            alert("Please fill in both fields.");
            return;
        }

        try {
            const data = await login(username, password);
            console.log("Login successful:", data);

            // Gem JWT-token i localStorage
            localStorage.setItem("token", data.token);

            // Naviger til Homepage efter succesfuldt login
            navigate("/homepage");
        } catch (error) {
            console.error("Login failed:", error);
            alert("Invalid username or password.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-900">
            <h1 className="text-4xl font-bold mb-4">Login</h1>
            <InputField
                label="Username"
                type="text"
                value={username}
                placeholder="Enter your username"
                onChange={(e) => setUsername(e.target.value)}
            />
            <InputField
                label="Password"
                type="password"
                value={password}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
    onClick={handleLogin}
    className="px-4 py-2 bg-blue-600 text-yellow-500 rounded hover:bg-blue-700 hover:text-yellow-300 transition"
>
    Login
</button>
        </div>
    );
};

export default LoginPage;