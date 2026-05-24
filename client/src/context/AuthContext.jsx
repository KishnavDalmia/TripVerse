import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchUser() {
			try {
				const token = localStorage.getItem("token");
				if (!token) {
					setUser(null);
					setLoading(false);
					return;
				}
				const data = await api.get("/api/auth/me");
				setUser(data);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching user:", error);
				localStorage.removeItem("token");
				setUser(null);
			} finally {
				setLoading(false);
			}
		}
		fetchUser();
	}, []);

	async function login(email, password) {
		try {
			setLoading(true);
			const response = await api.post("/api/auth/login", {
				email,
				password,
			});
			// Response is already unwrapped as data by the axios interceptor
			const userData = response;
			if (userData && userData.accessToken) {
				localStorage.setItem("token", userData.accessToken);
				const meData = await api.get("/api/auth/me");
				setUser(meData);
			} else {
				throw new Error("Invalid token response");
			}
			setLoading(false);
		} catch (error) {
			console.error("Error logging in:", error);
			setUser(null);
			setLoading(false);
			throw error;
		}
	}

	async function register(name, username, email, password) {
		try {
			setLoading(true);
			const response = await api.post("/api/auth/register", {
				name,
				username,
				email,
				password,
			});
			const userData = response;
			if (userData && userData.accessToken) {
				localStorage.setItem("token", userData.accessToken);
				const meData = await api.get("/api/auth/me");
				setUser(meData);
			} else {
				throw new Error("Invalid token response");
			}
			setLoading(false);
		} catch (error) {
			console.error("Error registering:", error);
			setUser(null);
			setLoading(false);
			throw error;
		}
	}

	async function logout() {
		try {
			await api.post("/api/auth/logout", {});
		} catch (error) {
			console.error("Error logging out from server:", error);
		} finally {
			localStorage.removeItem("token");
			setUser(null);
		}
	}

	return (
		<AuthContext.Provider
			value={{
				user,
				loading,
				register,
				login,
				logout,
				isAuthenticated: !!user,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
