import { Router } from "express";
import {
	addMember,
	createTrip,
	deleteMember,
	deleteTrip,
	getCurrentTrips,
	getPastTrips,
	getTripById,
	getUpcomingTrips,
	updateTrip,
	addActivity,
	deleteActivity,
	addExpense,
	deleteExpense,
} from "./../controllers/trip.controller.js";
import { verifyJWT } from "../middleware/auth.js";

const tripRouter = Router();
tripRouter.use(verifyJWT);

tripRouter.post("/createTrip", createTrip);
tripRouter.delete("/deleteTrip/:tripId", deleteTrip);
tripRouter.post("/addMember", addMember);
tripRouter.post("/deleteMember", deleteMember);
tripRouter.get("/getCurrentTrips/:userId", getCurrentTrips);
tripRouter.get("/getPastTrips/:userId", getPastTrips);
tripRouter.get("/getUpcomingTrips/:userId", getUpcomingTrips);
tripRouter.get("/getTripById/:tripId", getTripById);
tripRouter.put("/updateTrip/:tripId", updateTrip);

tripRouter.post("/:tripId/activity", addActivity);
tripRouter.delete("/:tripId/activity/:activityId", deleteActivity);
tripRouter.post("/:tripId/expense", addExpense);
tripRouter.delete("/:tripId/expense/:expenseId", deleteExpense);

export default tripRouter;
