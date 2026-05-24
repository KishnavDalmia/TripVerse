import { Link } from "react-router-dom";

const TripCard = ({ trip }) => {
	const from = new Date(trip.startDate);
	const to = new Date(trip.endDate);

	return (
		<Link
			to={`/trips/${trip._id}`}
			className="flex flex-col py-4 gap-5 shadow-lg hover:border-2 border-blue-500 rounded-lg cursor-pointer transition duration-300
     justify-evenly items-center w-80 h-92 hover:shadow-2xl bg-white no-underline text-slate-800"
		>
			<img
				src={trip.imgURL || "/trip1.png"}
				alt="Trip"
				width={320}
				height={200}
				className="rounded-lg mb-4 object-cover"
			/>
			
			<div className="w-full px-4 text-left">
				<span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{trip.destination || "Unknown Destination"}</span>
				<h2 className="font-bold text-2xl truncate w-full mt-0.5">
					{trip.name || "Untitled Trip"}
				</h2>
			</div>

			<div className="flex justify-start text-left gap-2 items-center w-full px-4">
				<img
					src="/schedule.svg"
					alt="Date Icon"
					width={20}
					height={20}
					className="rounded-lg"
				/>
				<span className="text-neutral-700 text-sm">
					{isNaN(from.getTime()) ? "TBD" : from.toLocaleDateString()} - {isNaN(to.getTime()) ? "TBD" : to.toLocaleDateString()}
				</span>
			</div>

			<div className="flex gap-1 justify-end w-full px-4 items-center">
				<img
					src="/people.svg"
					alt="Members Icon"
					width={20}
					height={20}
					className="rounded-lg"
				/>
				<span className="text-neutral-600 text-sm">
					{trip.members?.length || 1} { (trip.members?.length || 1) === 1 ? "person" : "people" }
				</span>
			</div>
		</Link>
	);
};

export default TripCard;
