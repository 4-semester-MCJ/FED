import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ManagerPage from "./pages/ManagerPage";

const App: React.FC = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<LoginPage />} />
				<Route path="/manager" element={<ManagerPage />} />
			</Routes>
		</Router>
	);
};

export default App;
