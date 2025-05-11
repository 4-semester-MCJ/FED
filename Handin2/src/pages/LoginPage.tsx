import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";
import InputField from "../components/fields/input_fields"; // Importer InputField-komponenten
import {jwtDecode} from "jwt-decode"; // Installer med: bun add jwt-decode

const LoginPage: React.FC = () => {
    const [email, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

        
                const handleLogin = async () => {
            if (!email || !password) {
                alert("Please fill in both fields.");
                return;
            }
        
            try {
                console.log("Attempting login with:", { email, password });
        
                // Send login request
                const token = await login(email, password);
        
                // Log the token for debugging
                console.log("Token received:", token);
        
                // Check if token exists
                if (token) {
                    // Decode the token to extract the role and modelId
                    const decodedToken: any = jwtDecode(token);
                    const role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
                    const modelId = decodedToken.ModelId; // Hent ModelId korrekt fra tokenet
        
                    console.log("Role:", role);
                    console.log("Model ID:", modelId);
        
                    // Save token, role, and modelId to localStorage
                    localStorage.setItem("token", token);
                    localStorage.setItem("role", role);
                    localStorage.setItem("modelId", modelId); // Gem modelId i localStorage
        
                    // Navigate to the appropriate page based on role
                    if (role === "Manager") {
                        navigate("/manager");
                    } else if (role === "Model") {
                        navigate("/model");
                    } else {
                        alert("Unknown role. Please contact support.");
                    }
                } else {
                    console.error("No token received from backend.");
                    alert("Login failed: No token received.");
                }
            } catch (error: any) {
                console.error("Login failed:", error);
                if (error.response) {
                    console.error("Backend error response:", error.response.data);
                    alert(error.response.data.message || "Invalid username or password.");
                } else {
                    alert("An unexpected error occurred. Please try again.");
                }
            }
        };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-900">
            <h1 className="text-4xl font-bold mb-4">Login</h1>
            <InputField
                label="Username"
                type="text"
                value={email}
                placeholder="Enter your email"
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