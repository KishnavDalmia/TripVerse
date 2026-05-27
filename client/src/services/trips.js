import api from "./api.js";

export const createTrip = async (tripData) => {
	return await api.post("/api/trips/createTrip", tripData);
};

export const deleteTrip = async (tripId) => {
	return await api.delete(`/api/trips/deleteTrip/${tripId}`);
};

export const getCurrentTrips = async (userId) => {
	return await api.get(`/api/trips/getCurrentTrips/${userId}`);
};

export const getUpcomingTrips = async (userId) => {
	return await api.get(`/api/trips/getUpcomingTrips/${userId}`);
};

export const getPastTrips = async (userId) => {
	return await api.get(`/api/trips/getPastTrips/${userId}`);
};

export const getTripById = async (tripId) => {
	return await api.get(`/api/trips/getTripById/${tripId}`);
};

export const updateTrip = async (tripId, tripData) => {
	return await api.put(`/api/trips/updateTrip/${tripId}`, tripData);
};


export const addMember = async (tripId, userId) => {
	return await api.post("/api/trips/addMember", { tripId, userId });
};

export const deleteMember = async (tripId, userId) => {
	return await api.post("/api/trips/deleteMember", { tripId, userId });
};

export const addActivity = async (tripId, activityData) => {
	return await api.post(`/api/trips/${tripId}/activity`, activityData);
};

export const deleteActivity = async (tripId, activityId) => {
	return await api.delete(`/api/trips/${tripId}/activity/${activityId}`);
};

export const addExpense = async (tripId, expenseData) => {
	return await api.post(`/api/trips/${tripId}/expense`, expenseData);
};

export const deleteExpense = async (tripId, expenseId) => {
	return await api.delete(`/api/trips/${tripId}/expense/${expenseId}`);
};
