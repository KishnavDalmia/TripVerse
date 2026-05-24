import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import {
	getTripById,
	addActivity,
	deleteActivity,
	addExpense,
	deleteExpense,
	addMember,
} from "../services/trips.js";
import Navbar from "../components/Navbar.jsx";

const TripDetails = () => {
	const { tripId } = useParams();
	const { user } = useAuth();
	const [trip, setTrip] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	// Expandable form toggles
	const [showActivityForm, setShowActivityForm] = useState(false);
	const [showExpenseForm, setShowExpenseForm] = useState(false);
	const [showMemberForm, setShowMemberForm] = useState(false);

	// Form inputs
	const [activityInput, setActivityInput] = useState({
		description: "",
		destination: "",
		startTime: "",
		endTime: "",
	});
	const [expenseInput, setExpenseInput] = useState({
		title: "",
		amount: "",
		category: "Other",
		currency: "INR",
		notes: "",
		date: "",
		paidById: "",
	});
	const [memberInput, setMemberInput] = useState("");

	const [actionLoading, setActionLoading] = useState(false);

	const fetchTrip = async () => {
		try {
			const data = await getTripById(tripId);
			setTrip(data);
			if (data.members?.length > 0) {
				setExpenseInput((prev) => ({ ...prev, paidById: data.members[0]._id }));
			}
		} catch (err) {
			setError(err.message || "Failed to load trip details.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchTrip();
	}, [tripId]);

	const handleAddActivity = async (e) => {
		e.preventDefault();
		setActionLoading(true);
		try {
			await addActivity(tripId, activityInput);
			setActivityInput({ description: "", destination: "", startTime: "", endTime: "" });
			setShowActivityForm(false);
			await fetchTrip();
		} catch (err) {
			alert(err.message || "Failed to add activity");
		} finally {
			setActionLoading(false);
		}
	};

	const handleDeleteActivity = async (activityId) => {
		if (!confirm("Are you sure you want to delete this activity?")) return;
		try {
			await deleteActivity(tripId, activityId);
			await fetchTrip();
		} catch (err) {
			alert(err.message || "Failed to delete activity");
		}
	};

	const handleAddExpense = async (e) => {
		e.preventDefault();
		setActionLoading(true);
		try {
			await addExpense(tripId, expenseInput);
			setExpenseInput({
				title: "",
				amount: "",
				category: "Other",
				currency: "INR",
				notes: "",
				date: "",
				paidById: trip.members[0]?._id || "",
			});
			setShowExpenseForm(false);
			await fetchTrip();
		} catch (err) {
			alert(err.message || "Failed to add expense");
		} finally {
			setActionLoading(false);
		}
	};

	const handleDeleteExpense = async (expenseId) => {
		if (!confirm("Are you sure you want to delete this expense?")) return;
		try {
			await deleteExpense(tripId, expenseId);
			await fetchTrip();
		} catch (err) {
			alert(err.message || "Failed to delete expense");
		}
	};

	const handleAddMemberSubmit = async (e) => {
		e.preventDefault();
		if (!memberInput.trim()) return;
		setActionLoading(true);
		try {
			await addMember(tripId, memberInput.trim());
			setMemberInput("");
			setShowMemberForm(false);
			await fetchTrip();
		} catch (err) {
			alert(err.message || "Failed to add member. Double check the User ID.");
		} finally {
			setActionLoading(false);
		}
	};

	if (loading) {
		return (
			<div className="min-h-screen bg-slate-50">
				<Navbar />
				<div className="flex h-[80vh] items-center justify-center">
					<div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
				</div>
			</div>
		);
	}

	if (error || !trip) {
		return (
			<div className="min-h-screen bg-slate-50">
				<Navbar />
				<div className="max-w-xl mx-auto mt-20 p-6 bg-white rounded-xl shadow-md border border-slate-100 text-center">
					<h3 className="text-xl font-bold text-red-600 mb-2">Error Loading Trip</h3>
					<p className="text-slate-500 mb-6">{error || "Trip not found"}</p>
					<Link to="/dashboard" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700">
						Back to Dashboard
					</Link>
				</div>
			</div>
		);
	}

	const totalExpense = trip.expenses?.reduce((sum, exp) => sum + exp.amount, 0) || 0;
	const memberCount = trip.members?.length || 1;
	const costPerPerson = totalExpense / memberCount;

	return (
		<div className="min-h-screen bg-slate-50 font-sans pb-16">
			<Navbar />
			
			<div className="max-w-[75%] mx-auto mt-8">
				{/* Top Navigation */}
				<div className="flex justify-between items-center mb-6">
					<Link to="/dashboard" className="text-sm font-semibold text-blue-600 hover:text-blue-500 flex items-center gap-1">
						← Back to Dashboard
					</Link>
					<div className="text-xs text-slate-400 font-mono">Trip ID: {trip._id}</div>
				</div>

				{/* Trip Header Banner */}
				<div className="bg-white p-8 rounded-2xl shadow-md border border-slate-100 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
					<div className="space-y-2">
						<span className="bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
							{trip.destination}
						</span>
						<h1 className="text-3xl font-black text-slate-900 tracking-tight">{trip.name}</h1>
						<div className="flex items-center gap-2 text-slate-500 text-sm">
							<img src="/schedule.svg" alt="Calendar" width={18} height={18} />
							<span>
								{new Date(trip.startDate).toLocaleDateString()} — {new Date(trip.endDate).toLocaleDateString()}
							</span>
						</div>
					</div>

					{/* Trip Members Display */}
					<div className="bg-slate-50 p-4 rounded-xl border border-slate-100 min-w-[280px]">
						<div className="flex justify-between items-center mb-2">
							<h3 className="font-bold text-slate-800 text-sm">Travel Companions</h3>
							<button 
								onClick={() => setShowMemberForm(!showMemberForm)}
								className="text-xs font-semibold text-blue-600 hover:text-blue-500 underline"
							>
								+ Add Member
							</button>
						</div>
						
						{showMemberForm && (
							<form onSubmit={handleAddMemberSubmit} className="mb-3 flex gap-2">
								<input
									type="text"
									placeholder="Paste User MongoDB ID"
									required
									value={memberInput}
									onChange={(e) => setMemberInput(e.target.value)}
									className="flex-1 text-xs border border-slate-300 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
								/>
								<button 
									type="submit" 
									disabled={actionLoading}
									className="bg-blue-600 text-white text-xs px-3 py-1 rounded hover:bg-blue-700 disabled:bg-blue-400"
								>
									Add
								</button>
							</form>
						)}

						<div className="flex flex-wrap gap-2 max-h-[80px] overflow-y-auto">
							{trip.members?.map((m) => (
								<div 
									key={m._id} 
									className="flex items-center gap-1 bg-white border border-slate-200 px-2.5 py-1 rounded-lg text-xs font-medium text-slate-700 shadow-sm"
									title={`Username: ${m.username}`}
								>
									<div className="w-2 h-2 rounded-full bg-green-500"></div>
									<span>{m.name}</span>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Details Columns */}
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
					{/* Left: Itinerary Column */}
					<div className="lg:col-span-7 space-y-6">
						<div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100">
							<div className="flex justify-between items-center mb-6">
								<div className="flex items-center gap-2.5">
									<img src="/itinerary.svg" alt="Itinerary" width={26} height={26} />
									<h2 className="text-2xl font-black text-slate-800 tracking-tight">Itinerary Planner</h2>
								</div>
								<button
									onClick={() => setShowActivityForm(!showActivityForm)}
									className="bg-blue-50 hover:bg-blue-100 text-blue-600 text-sm font-bold px-4 py-1.5 rounded-lg transition"
								>
									{showActivityForm ? "Cancel" : "+ Add Activity"}
								</button>
							</div>

							{showActivityForm && (
								<form onSubmit={handleAddActivity} className="mb-6 p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
									<div className="grid grid-cols-2 gap-4">
										<div>
											<label className="block text-xs font-semibold text-slate-600 mb-1">Description / Title</label>
											<input
												type="text"
												placeholder="E.g., Eiffel Tower Tour"
												required
												value={activityInput.description}
												onChange={(e) => setActivityInput({ ...activityInput, description: e.target.value })}
												className="w-full text-sm border border-slate-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
											/>
										</div>
										<div>
											<label className="block text-xs font-semibold text-slate-600 mb-1">Location</label>
											<input
												type="text"
												placeholder="E.g., Champ de Mars"
												required
												value={activityInput.destination}
												onChange={(e) => setActivityInput({ ...activityInput, destination: e.target.value })}
												className="w-full text-sm border border-slate-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
											/>
										</div>
									</div>

									<div className="grid grid-cols-2 gap-4">
										<div>
											<label className="block text-xs font-semibold text-slate-600 mb-1">Start Date & Time</label>
											<input
												type="datetime-local"
												required
												value={activityInput.startTime}
												onChange={(e) => setActivityInput({ ...activityInput, startTime: e.target.value })}
												className="w-full text-sm border border-slate-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
											/>
										</div>
										<div>
											<label className="block text-xs font-semibold text-slate-600 mb-1">End Date & Time</label>
											<input
												type="datetime-local"
												required
												value={activityInput.endTime}
												onChange={(e) => setActivityInput({ ...activityInput, endTime: e.target.value })}
												className="w-full text-sm border border-slate-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
											/>
										</div>
									</div>

									<button
										type="submit"
										disabled={actionLoading}
										className="w-full bg-blue-600 text-white text-sm font-bold py-2 rounded-lg hover:bg-blue-700 transition"
									>
										Save Activity
									</button>
								</form>
							)}

							{/* Activities List */}
							<div className="space-y-4">
								{trip.itinerary?.length === 0 ? (
									<div className="text-center py-10 bg-slate-50 border border-dashed border-slate-200 rounded-xl">
										<p className="text-slate-400 text-sm">No activities planned yet.</p>
										<p className="text-slate-400 text-xs mt-1">Start adding events to build your travel plan!</p>
									</div>
								) : (
									[...trip.itinerary]
										.sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
										.map((act) => {
											const start = new Date(act.startTime);
											const end = new Date(act.endTime);
											return (
												<div key={act._id} className="group relative flex justify-between items-start bg-slate-50 border border-slate-100 p-4 rounded-xl hover:shadow transition-shadow">
													<div className="space-y-1 pr-6">
														<h4 className="font-extrabold text-slate-800 text-lg leading-tight">{act.description}</h4>
														<div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-500 text-xs">
															<span className="flex items-center gap-1 font-medium">
																📍 {act.destination}
															</span>
															<span className="font-mono">
																📅 {start.toLocaleDateString()} {start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} — {end.toLocaleDateString()} {end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
															</span>
														</div>
													</div>

													<button
														onClick={() => handleDeleteActivity(act._id)}
														className="text-slate-400 hover:text-red-500 transition-colors p-1"
														title="Delete activity"
													>
														🗑️
													</button>
												</div>
											);
										})
								)}
							</div>
						</div>
					</div>

					{/* Right: Expenses Column */}
					<div className="lg:col-span-5 space-y-6">
						{/* Expense Overview Card */}
						<div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-2xl shadow-lg text-white space-y-4">
							<div className="flex items-center gap-2">
								<img src="/wallet.svg" alt="Wallet" className="invert" width={24} height={24} />
								<h3 className="text-lg font-black tracking-tight uppercase">Expense Summary</h3>
							</div>
							
							<div className="grid grid-cols-2 gap-4 divide-x divide-white/20">
								<div>
									<div className="text-xs text-white/70">Total Spending</div>
									<div className="text-3xl font-black">{totalExpense.toLocaleString()} <span className="text-sm font-bold">INR</span></div>
								</div>
								<div className="pl-4">
									<div className="text-xs text-white/70">Cost Split / Person</div>
									<div className="text-3xl font-black">{Math.round(costPerPerson).toLocaleString()} <span className="text-sm font-bold">INR</span></div>
								</div>
							</div>
						</div>

						{/* Expense Log */}
						<div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100">
							<div className="flex justify-between items-center mb-6">
								<div className="flex items-center gap-2">
									<img src="/dollar.svg" alt="Dollar" width={24} height={24} />
									<h2 className="text-xl font-black text-slate-800 tracking-tight">Expense Ledger</h2>
								</div>
								<button
									onClick={() => setShowExpenseForm(!showExpenseForm)}
									className="bg-blue-50 hover:bg-blue-100 text-blue-600 text-sm font-bold px-3 py-1.5 rounded-lg transition"
								>
									{showExpenseForm ? "Cancel" : "+ Add Expense"}
								</button>
							</div>

							{showExpenseForm && (
								<form onSubmit={handleAddExpense} className="mb-6 p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
									<div className="grid grid-cols-2 gap-4">
										<div>
											<label className="block text-xs font-semibold text-slate-600 mb-1">Expense Title</label>
											<input
												type="text"
												placeholder="E.g., Dinner at Cafe"
												required
												value={expenseInput.title}
												onChange={(e) => setExpenseInput({ ...expenseInput, title: e.target.value })}
												className="w-full text-sm border border-slate-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
											/>
										</div>
										<div>
											<label className="block text-xs font-semibold text-slate-600 mb-1">Amount (INR)</label>
											<input
												type="number"
												placeholder="E.g., 1500"
												required
												min="1"
												value={expenseInput.amount}
												onChange={(e) => setExpenseInput({ ...expenseInput, amount: Number(e.target.value) })}
												className="w-full text-sm border border-slate-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
											/>
										</div>
									</div>

									<div className="grid grid-cols-2 gap-4">
										<div>
											<label className="block text-xs font-semibold text-slate-600 mb-1">Category</label>
											<select
												value={expenseInput.category}
												onChange={(e) => setExpenseInput({ ...expenseInput, category: e.target.value })}
												className="w-full text-sm border border-slate-300 rounded-lg p-2 bg-white focus:outline-none focus:border-blue-500"
											>
												<option value="Food">Food</option>
												<option value="Transport">Transport</option>
												<option value="Stay">Stay</option>
												<option value="Other">Other</option>
											</select>
										</div>
										<div>
											<label className="block text-xs font-semibold text-slate-600 mb-1">Who Paid?</label>
											<select
												value={expenseInput.paidById}
												onChange={(e) => setExpenseInput({ ...expenseInput, paidById: e.target.value })}
												className="w-full text-sm border border-slate-300 rounded-lg p-2 bg-white focus:outline-none focus:border-blue-500"
											>
												{trip.members?.map((m) => (
													<option key={m._id} value={m._id}>{m.name}</option>
												))}
											</select>
										</div>
									</div>

									<div>
										<label className="block text-xs font-semibold text-slate-600 mb-1">Date</label>
										<input
											type="date"
											required
											value={expenseInput.date}
											onChange={(e) => setExpenseInput({ ...expenseInput, date: e.target.value })}
											className="w-full text-sm border border-slate-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
										/>
									</div>

									<button
										type="submit"
										disabled={actionLoading}
										className="w-full bg-blue-600 text-white text-sm font-bold py-2 rounded-lg hover:bg-blue-700 transition"
									>
										Save Expense
									</button>
								</form>
							)}

							{/* Expenses List */}
							<div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
								{trip.expenses?.length === 0 ? (
									<div className="text-center py-10 bg-slate-50 border border-dashed border-slate-200 rounded-xl">
										<p className="text-slate-400 text-sm">No expenses logged yet.</p>
										<p className="text-slate-400 text-xs mt-1">Keep track of split costs during your travel.</p>
									</div>
								) : (
									[...trip.expenses]
										.sort((a, b) => new Date(b.date) - new Date(a.date))
										.map((exp) => (
											<div key={exp._id} className="flex justify-between items-center p-3.5 bg-slate-50 border border-slate-100 rounded-xl hover:shadow-sm transition-shadow">
												<div className="space-y-0.5">
													<div className="flex items-center gap-2">
														<span className="font-extrabold text-slate-800 text-sm">{exp.title}</span>
														<span className="bg-slate-200/60 text-slate-600 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
															{exp.category}
														</span>
													</div>
													<div className="text-slate-400 text-xs font-medium">
														Paid by <span className="text-slate-600 font-semibold">{exp.paidBy?.name || "Member"}</span> on {new Date(exp.date).toLocaleDateString()}
													</div>
												</div>

												<div className="flex items-center gap-3">
													<div className="text-right">
														<div className="font-black text-slate-800 text-sm">{exp.amount.toLocaleString()} {exp.currency}</div>
													</div>
													<button
														onClick={() => handleDeleteExpense(exp._id)}
														className="text-slate-300 hover:text-red-500 transition-colors text-xs p-1"
														title="Delete expense"
													>
														🗑️
													</button>
												</div>
											</div>
										))
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TripDetails;
