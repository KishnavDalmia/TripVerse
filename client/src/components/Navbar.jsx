import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = () => {
	const { isAuthenticated, logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = async () => {
		await logout();
		navigate("/");
	};

	return (
		<div className="flex justify-between items-center px-6 py-2 sticky top-0 z-50 bg-white/80 backdrop-blur-md transition-all duration-300 border-b border-gray-200">
			<Link to="/" className="p-2 flex items-center gap-3 select-none">
				<img src="/airplane.svg" alt="Logo" width={50} height={25} />
				<span className="font-extrabold text-xl text-blue-600 tracking-tight">TripVerse</span>
			</Link>
			<div className="flex justify-evenly items-center gap-6 text-sm font-semibold text-slate-700">
				<a href="/#features" className="hover:text-blue-600 transition-colors">Features</a>
				<a href="/#how-it-works" className="hover:text-blue-600 transition-colors">How It Works</a>
			</div>
			<div className="flex items-center gap-4">
				{isAuthenticated ? (
					<>
						<Link to="/dashboard" className="text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors">
							Dashboard
						</Link>
						<button
							onClick={handleLogout}
							className="bg-red-50 text-red-600 hover:bg-red-100 font-bold px-4 py-1.5 rounded-lg text-sm transition cursor-pointer"
						>
							Logout
						</button>
					</>
				) : (
					<Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-1.5 rounded-lg text-sm transition">
						Login
					</Link>
				)}
			</div>
		</div>
	);
};

export default Navbar;