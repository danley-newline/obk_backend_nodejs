import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    minAmount: {
        type: Number,
        required: true
    },
    maxAmount: {
        type: Number,
        required: true
    },
    creditFeesAmount: {
        type: Number,
        required: true
    },
    interestRate: {
        type: Number,
        required: true
    },
    durationInDays: {
        type: Number,
        required: true
    },
    imgUrl: {
        type: String
    }
});

export default mongoose.model("Product", ProductSchema);