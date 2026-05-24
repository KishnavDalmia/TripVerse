import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function LoginPage() {
	const { login, register } = useAuth();
	const navigate = useNavigate();
	const [isLogin, setIsLogin] = useState(true);
	const [formData, setFormData] = useState({
		name: "",
		username: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		setError("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			if (isLogin) {
				await login(formData.email, formData.password);
			} else {
				await register(
					formData.name,
					formData.username,
					formData.email,
					formData.password,
				);
			}
			navigate("/dashboard");
		} catch (err) {
			setError(err.message || "An authentication error occurred. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 sm:px-6 lg:px-8 font-sans">
			<div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
				<div>
					<div className="flex items-center justify-center gap-3 mb-6">
						<img src="/airplane.svg" alt="Logo" width={50} height={25} />
						<span className="text-2xl font-black text-blue-600 tracking-tight">TripVerse</span>
					</div>
					<h2 className="mt-2 text-center text-3xl font-extrabold text-slate-900">
						{isLogin ? "Welcome back" : "Create your account"}
					</h2>
					<p className="mt-2 text-center text-sm text-slate-500">
						{isLogin ? "Or " : "Already have an account? "}
						<button
							type="button"
							onClick={() => {
								setIsLogin(!isLogin);
								setError("");
							}}
							className="font-semibold text-blue-600 hover:text-blue-500 underline transition cursor-pointer"
						>
							{isLogin ? "create a new account" : "sign in here"}
						</button>
					</p>
				</div>

				{error && (
					<div className="rounded-lg bg-red-50 p-4 text-sm text-red-600 border border-red-100">
						<div className="font-semibold">Authentication Failed</div>
						<div>{error}</div>
					</div>
				)}

				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					<div className="space-y-4 rounded-md">
						{!isLogin && (
							<>
								<div>
									<label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
										Full Name
									</label>
									<input
										id="name"
										name="name"
										type="text"
										required={!isLogin}
										value={formData.name}
										onChange={handleChange}
										className="relative block w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
										placeholder="John Doe"
									/>
								</div>
								<div>
									<label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-1">
										Username
									</label>
									<input
										id="username"
										name="username"
										type="text"
										required={!isLogin}
										value={formData.username}
										onChange={handleChange}
										className="relative block w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
										placeholder="johndoe123"
									/>
								</div>
							</>
						)}

						<div>
							<label htmlFor="email-address" className="block text-sm font-medium text-slate-700 mb-1">
								Email address
							</label>
							<input
								id="email-address"
								name="email"
								type="email"
								autoComplete="email"
								required
								value={formData.email}
								onChange={handleChange}
								className="relative block w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
								placeholder="name@example.com"
							/>
						</div>

						<div>
							<label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
								Password
							</label>
							<input
								id="password"
								name="password"
								type="password"
								autoComplete={isLogin ? "current-password" : "new-password"}
								required
								value={formData.password}
								onChange={handleChange}
								className="relative block w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
								placeholder="••••••••"
							/>
						</div>
					</div>

					<div>
						<button
							type="submit"
							disabled={loading}
							className="group relative flex w-full justify-center rounded-lg bg-blue-600 py-2.5 px-4 text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400 transition cursor-pointer"
						>
							{loading ? (
								<div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
							) : isLogin ? (
								"Sign In"
							) : (
								"Sign Up"
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}