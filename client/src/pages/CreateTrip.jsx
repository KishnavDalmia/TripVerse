import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createTrip } from "../services/trips.js";
import { useAuth } from "../context/AuthContext.jsx";

const CreateTripPage = () => {
	const { user } = useAuth();
	const navigate = useNavigate();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		const formData = new FormData(e.currentTarget);
		const title = formData.get("title");
		const location = formData.get("location");
		const fromDate = formData.get("fromDate");
		const toDate = formData.get("toDate");

		if (!user) {
			setError("You must be logged in to create a trip.");
			setLoading(false);
			return;
		}

		try {
			await createTrip({
				userId: user._id,
				name: title,
				destination: location,
				startDate: fromDate,
				endDate: toDate,
			});
			navigate("/dashboard");
		} catch (err) {
			setError(err.message || "Failed to create trip. Please check your inputs.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-slate-50 py-10 px-4 font-sans">
			<div className="w-full max-w-xl m-auto shadow-xl p-8 rounded-2xl bg-white border border-slate-100 my-10">
				<div className="flex justify-between items-center mb-6">
					<Link to="/dashboard" className="text-sm font-semibold text-blue-600 hover:text-blue-500 flex items-center gap-1">
						← Back to Dashboard
					</Link>
					<span className="text-xs text-slate-400">Step 1 of 3</span>
				</div>
				
				<div className="text-center mb-8">
					<h2 className="text-3xl font-extrabold text-slate-900 mb-2">Create a New Trip</h2>
					<p className="text-slate-500">Plan your next adventure</p>
				</div>

				{error && (
					<div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-600 border border-red-100">
						{error}
					</div>
				)}

				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="flex flex-col gap-5">
						<div>
							<h4 className="text-lg font-bold text-slate-800">Basic Information</h4>
							<p className="text-slate-400 text-sm mt-0.5">Enter details about your destination and timing</p>
						</div>

						<div>
							<label className="block text-sm font-semibold text-slate-700 mb-1.5">Trip Name</label>
							<input
								required
								name="title"
								type="text"
								className="block w-full border border-slate-300 rounded-lg shadow-sm p-2.5 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
								placeholder="My Summer Vacation"
							/>
						</div>

						<div>
							<label className="block text-sm font-semibold text-slate-700 mb-1.5">Destination</label>
							<input
								required
								name="location"
								type="text"
								className="block w-full border border-slate-300 rounded-lg shadow-sm p-2.5 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
								placeholder="Paris, France"
							/>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div>
								<label className="block text-sm font-semibold text-slate-700 mb-1.5">Start Date</label>
								<input
									required
									name="fromDate"
									type="date"
									className="block w-full border border-slate-300 rounded-lg shadow-sm p-2.5 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
								/>
							</div>
							<div>
								<label className="block text-sm font-semibold text-slate-700 mb-1.5">End Date</label>
								<input
									required
									name="toDate"
									type="date"
									className="block w-full border border-slate-300 rounded-lg shadow-sm p-2.5 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
								/>
							</div>
						</div>

						<div>
							<label className="block text-sm font-semibold text-slate-700 mb-1.5">Number of People</label>
							<input
								required
								name="numPeople"
								type="number"
								min="1"
								defaultValue="1"
								className="block w-full border border-slate-300 rounded-lg shadow-sm p-2.5 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
								placeholder="1"
							/>
						</div>
					</div>

					<button
						type="submit"
						disabled={loading}
						className="w-full mt-6 bg-blue-600 text-white font-bold px-4 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400 transition cursor-pointer flex justify-center items-center"
					>
						{loading ? (
							<div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
						) : (
							"Create Trip"
						)}
					</button>
				</form>
			</div>
		</div>
	);
};

export default CreateTripPage;