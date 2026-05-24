import { useEffect, useState } from "react";
import TripClient from "../components/TripClient.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import api from "./../services/api.js";
import Navbar from "../components/Navbar.jsx";

const Dashboard = () => {
	const { user: currentUser } = useAuth();
	const [trips, setTrips] = useState({
		pastTrips: [],
		currentTrips: [],
		upcomingTrips: [],
	});
	useEffect(() => {
		async function fetchTrips() {
			if (!currentUser) return;
			const userId = currentUser._id;
			const pastRes = await api.get(`/api/trips/getPastTrips/${userId}`);
			const currentRes = await api.get(
				`/api/trips/getCurrentTrips/${userId}`,
			);
			const upcomingRes = await api.get(
				`/api/trips/getUpcomingTrips/${userId}`,
			);

			setTrips({
				pastTrips: pastRes || [],
				currentTrips: currentRes || [],
				upcomingTrips: upcomingRes || [],
			});
		}
		fetchTrips();
	}, [currentUser]);

	const allTrips = [
		...trips.pastTrips,
		...trips.currentTrips,
		...trips.upcomingTrips,
	];

	return (
		<div className="min-h-screen bg-slate-50">
			<Navbar />
			<div className="py-6">
				<TripClient
					user={currentUser}
					pastTrips={trips.pastTrips}
					currentTrips={trips.currentTrips}
					upcomingTrips={trips.upcomingTrips}
					allTrips={allTrips}
				/>
			</div>
		</div>
	);
};

export default Dashboard;
