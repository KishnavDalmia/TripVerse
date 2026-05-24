import { useState } from "react";
import CategoryList from "@/components/CategoryList";
import CreateCard from "@/components/CreateCard";
import SearchBar from "@/components/SearchBar";
import TripCard from "@/components/TripCard";

const TripClient = ({
	user,
	pastTrips,
	currentTrips,
	upcomingTrips,
	allTrips,
}) => {
	let seltrips;
	const [selectedCategory, setSelectedCategory] = useState("all");
	if (selectedCategory === "past") {
		seltrips = pastTrips;
	} else if (selectedCategory === "current") {
		seltrips = currentTrips;
	} else if (selectedCategory === "upcoming") {
		seltrips = upcomingTrips;
	} else {
		seltrips = allTrips;
	}
	return (
		<div className="mx-auto w-[70%]">
			{/* <SearchBar /> */}
			<div className="my-4">
				<h1 className="text-4xl font-bold my-3">My Trips</h1>
				<h3 className="text-xl text-neutral-900 mb-12">
					Manage and create trips here.
				</h3>
			</div>
			<CategoryList selectCat={setSelectedCategory} />
			<div className="flex flex-wrap justify-start gap-12 my-8">
				<CreateCard />
				{seltrips.map((trip) => (
					<TripCard key={trip.id} trip={trip} />
				))}
			</div>
		</div>
	);
};

export default TripClient;
