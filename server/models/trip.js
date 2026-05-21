import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
    name: { type: String, required: true},
    description: { type: String },
    destination: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    expenses: [{type:mongoose.Schema.Types.ObjectId, ref: 'Expense'}],
    itinerary: [{type:mongoose.Schema.Types.ObjectId, ref: 'Activity'}],
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
},{timestamps:true});

const Trip = mongoose.model('Trip',tripSchema);

export default Trip;