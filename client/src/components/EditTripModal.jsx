import { useState, useEffect } from "react";
import { updateTrip } from "../services/trips.js";

const EditTripModal = ({ isOpen, onClose, trip, onUpdateSuccess }) => {
	const [formData, setFormData] = useState({
		name: "",
		destination: "",
		startDate: "",
		endDate: "",
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		if (trip) {
			// Helper to format Date string to YYYY-MM-DD for date inputs
			const formatDate = (dateStr) => {
				if (!dateStr) return "";
				const d = new Date(dateStr);
				if (isNaN(d.getTime())) return "";
				return d.toISOString().split("T")[0];
			};

			setFormData({
				name: trip.name || "",
				destination: trip.destination || "",
				startDate: formatDate(trip.startDate),
				endDate: formatDate(trip.endDate),
			});
		}
	}, [trip, isOpen]);

	if (!isOpen || !trip) return null;

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		setError("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			await updateTrip(trip._id, formData);
			onUpdateSuccess();
			onClose();
		} catch (err) {
			setError(err.message || "Failed to update trip. Please check your inputs.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300">
			<div className="w-full max-w-lg overflow-hidden bg-white rounded-2xl shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
				{/* Header */}
				<div className="flex justify-between items-center px-6 py-4 bg-slate-50 border-b border-slate-100">
					<h3 className="text-xl font-extrabold text-slate-800">Edit Trip Details</h3>
					<button
						onClick={onClose}
						className="text-slate-400 hover:text-slate-600 transition-colors p-1.5 rounded-full hover:bg-slate-100"
					>
						✕
					</button>
				</div>

				{/* Body */}
				<form onSubmit={handleSubmit} className="p-6 space-y-5">
					{error && (
						<div className="p-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg">
							{error}
						</div>
					)}

					<div className="space-y-4">
						<div>
							<label className="block text-sm font-semibold text-slate-700 mb-1.5">
								Trip Name
							</label>
							<input
								required
								type="text"
								name="name"
								value={formData.name}
								onChange={handleChange}
								className="block w-full border border-slate-300 rounded-lg shadow-sm p-2.5 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm text-slate-800"
								placeholder="e.g. My Summer Vacation"
							/>
						</div>

						<div>
							<label className="block text-sm font-semibold text-slate-700 mb-1.5">
								Destination
							</label>
							<input
								required
								type="text"
								name="destination"
								value={formData.destination}
								onChange={handleChange}
								className="block w-full border border-slate-300 rounded-lg shadow-sm p-2.5 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm text-slate-800"
								placeholder="e.g. Paris, France"
							/>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div>
								<label className="block text-sm font-semibold text-slate-700 mb-1.5">
									Start Date
								</label>
								<input
									required
									type="date"
									name="startDate"
									value={formData.startDate}
									onChange={handleChange}
									className="block w-full border border-slate-300 rounded-lg shadow-sm p-2.5 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm text-slate-800"
								/>
							</div>
							<div>
								<label className="block text-sm font-semibold text-slate-700 mb-1.5">
									End Date
								</label>
								<input
									required
									type="date"
									name="endDate"
									value={formData.endDate}
									onChange={handleChange}
									className="block w-full border border-slate-300 rounded-lg shadow-sm p-2.5 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm text-slate-800"
								/>
							</div>
						</div>
					</div>

					{/* Footer */}
					<div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
						<button
							type="button"
							onClick={onClose}
							className="px-4 py-2 text-sm font-bold text-slate-600 hover:text-slate-800 hover:bg-slate-50 border border-slate-200 rounded-lg transition"
						>
							Cancel
						</button>
						<button
							type="submit"
							disabled={loading}
							className="px-5 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 rounded-lg shadow-sm transition flex items-center justify-center min-w-[90px]"
						>
							{loading ? (
								<div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
							) : (
								"Save Changes"
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default EditTripModal;
