import React from "react";

const CategoryList = ({ selectCat }) => {
	return (
		<div>
			<div className="flex justify-evenly bg-gray-100 py-1 rounded-md w-180">
				<button
					className="focus:bg-white focus:shadow-md text-slate-800 font-semibold px-10 py-2 rounded-md hover:text-black transition cursor-pointer"
					onClick={() => selectCat("all")}
				>
					All
				</button>
				<button
					className="focus:bg-white focus:shadow-md text-slate-800 font-semibold px-10 py-2 rounded-md hover:text-black transition cursor-pointer"
					onClick={() => selectCat("past")}
				>
					Past
				</button>
				<button
					className="focus:bg-white focus:shadow-md text-slate-800 font-semibold px-10 py-2 rounded-md hover:text-black transition cursor-pointer"
					onClick={() => selectCat("upcoming")}
				>
					Upcoming
				</button>
				<button
					className="focus:bg-white focus:shadow-md text-slate-800 font-semibold px-10 py-2 rounded-md hover:text-black transition cursor-pointer"
					onClick={() => selectCat("current")}
				>
					Current (Live)
				</button>
			</div>
		</div>
	);
};

export default CategoryList;