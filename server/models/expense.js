import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
    title:{type:String,required: true},
    amount:{type:Number,required: true},
    category:{
        type: String,
        enum: ['Food','Transport','Stay','Other'],
        default: 'Other'
    },
    currency:{
        type: String,
        default: 'INR'
    },
    notes:{
        type: String
    },
    date:{
        type: Date,
        required: true
    },
    paidBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    trip:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trip',
        required: true
    }
},{timestamps: true});

const Expense = mongoose.Model('Expense',expenseSchema);

export default Expense;