import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import CreateTrip from "./pages/CreateTrip.jsx";
import TripDetails from "./pages/TripDetails.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Landing />} />
			<Route path="/login" element={<Login />} />

			{/* Protected Routes */}
			<Route element={<PrivateRoute />}>
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/trips/create" element={<CreateTrip />} />
				<Route path="/trips/:tripId" element={<TripDetails />} />
			</Route>
		</Routes>
	);
};

export default App;
