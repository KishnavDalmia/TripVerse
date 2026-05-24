import Trip from "../models/trip.js";
import Activity from "../models/activity.js";
import Expense from "../models/expense.js";

export const createTrip = async (req, res) => {
	const { userId, name, destination, startDate, endDate } = req.body;
	try {
		if (!name) {
			return res.status(400).json({ message: "Trip name is required" });
		}
		const newTrip = new Trip({
			name,
			members: [userId],
			destination,
			startDate,
			endDate,
		});
		await newTrip.save();
		res.status(201).json(newTrip);
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
};

export const getCurrentTrips = async (req, res) => {
	const { userId } = req.params;
	try {
		const currentTrips = await Trip.find({
			members: userId,
			startDate: { $lte: new Date() },
			endDate: { $gte: new Date() },
		}).populate("members", "-password");
		return res.status(200).json(currentTrips);
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
};

export const getPastTrips = async (req, res) => {
	const { userId } = req.params;
	try {
		const pastTrips = await Trip.find({
			members: userId,
			endDate: { $lt: new Date() },
		}).populate("members", "-password");
		return res.status(200).json(pastTrips);
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
};

export const getUpcomingTrips = async (req, res) => {
	const { userId } = req.params;
	try {
		const upcomingTrips = await Trip.find({
			members: userId,
			startDate: { $gt: new Date() },
		}).populate("members", "-password");
		return res.status(200).json(upcomingTrips);
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
};

export const getTripById = async (req, res) => {
	const { tripId } = req.params;
	try {
		const trip = await Trip.findById(tripId)
			.populate("members", "-password")
			.populate("itinerary")
			.populate({
				path: "expenses",
				populate: { path: "paidBy", select: "name username" },
			});
		if (!trip) {
			return res.status(404).json({ message: "Trip not found" });
		}
		return res.status(200).json(trip);
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
};

export const deleteTrip = async (req, res) => {
	const { tripId } = req.params;
	try {
		const trip = await Trip.findByIdAndDelete(tripId);
		if (!trip) {
			return res.status(404).json({ message: "Trip not found" });
		}
		return res.status(200).json({ message: "Trip deleted successfully" });
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
};

export const addMember = async (req, res) => {
	const { tripId, userId } = req.body;
	try {
		const trip = await Trip.findByIdAndUpdate(
			tripId,
			{ $addToSet: { members: userId } },
			{ new: true },
		).populate("members", "-password");
		return res.status(200).json({ message: "Member added successfully", trip });
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
};

export const deleteMember = async (req, res) => {
	const { tripId, userId } = req.body;
	try {
		const trip = await Trip.findByIdAndUpdate(
			tripId,
			{ $pull: { members: userId } },
			{ new: true },
		).populate("members", "-password");
		return res.status(200).json({ message: "Member removed successfully", trip });
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
};

export const updateTrip = async (req, res) => {
	const { tripId } = req.params;
	const { name, destination, startDate, endDate } = req.body;
	try {
		const updatedTrip = await Trip.findByIdAndUpdate(
			tripId,
			{ name, destination, startDate, endDate },
			{ new: true, runValidators: true }
		).populate("members", "-password");
		if (!updatedTrip) {
			return res.status(404).json({ message: "Trip not found" });
		}
		return res.status(200).json(updatedTrip);
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
};

export const addActivity = async (req, res) => {
	const { tripId } = req.params;
	const { description, destination, startTime, endTime } = req.body;
	try {
		const newActivity = new Activity({
			description,
			destination,
			startTime,
			endTime,
		});
		await newActivity.save();

		await Trip.findByIdAndUpdate(tripId, {
			$push: { itinerary: newActivity._id },
		});

		return res.status(201).json(newActivity);
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
};

export const deleteActivity = async (req, res) => {
	const { tripId, activityId } = req.params;
	try {
		await Activity.findByIdAndDelete(activityId);
		await Trip.findByIdAndUpdate(tripId, {
			$pull: { itinerary: activityId },
		});
		return res.status(200).json({ message: "Activity deleted successfully" });
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
};

export const addExpense = async (req, res) => {
	const { tripId } = req.params;
	const { title, amount, category, currency, notes, date, paidById } = req.body;
	try {
		const newExpense = new Expense({
			title,
			amount,
			category,
			currency,
			notes,
			date,
			paidBy: paidById,
			trip: tripId,
		});
		await newExpense.save();

		await Trip.findByIdAndUpdate(tripId, {
			$push: { expenses: newExpense._id },
		});

		return res.status(201).json(newExpense);
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
};

export const deleteExpense = async (req, res) => {
	const { tripId, expenseId } = req.params;
	try {
		await Expense.findByIdAndDelete(expenseId);
		await Trip.findByIdAndUpdate(tripId, {
			$pull: { expenses: expenseId },
		});
		return res.status(200).json({ message: "Expense deleted successfully" });
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
};
