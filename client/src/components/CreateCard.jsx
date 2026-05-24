import { Link } from "react-router-dom";

const CreateCard = () => {
	return (
		<Link
			to="/trips/create"
			className="flex flex-col py-4 gap-5 shadow-lg hover:border-2 border-dashed border-blue-500 rounded-lg cursor-pointer transition duration-300
     justify-center items-center w-80 h-92 hover:shadow-2xl hover:bg-blue-50"
		>
			<img src="/add.svg" alt="Create Trip" width={60} height={60} className="rounded-full bg-blue-300 p-5" />
			<div className="flex flex-col gap-2">
				<h2 className="font-bold text-2xl w-full text-center">Create New Trip</h2>
				<p className="text-neutral-700 text-center">Plan your next adventure.</p>
			</div>
		</Link>
	);
};

export default CreateCard;