import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
    description: { type: String },
    destination: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
},{timestamps: true});

const Itinerary = mongoose.model('Activity',activitySchema);

export default Activity;