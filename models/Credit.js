import mongoose from 'mongoose';

const CreditSchema = new mongoose.Schema({
    numeroClient: {
        type: String,
        required: true,
    },
    montant: {
        type: Number,
        required: true,
    },
    isGranted: {
        type: Boolean,
        required: false,
    },
    limitDate: {
        type: String,
        required: true,
    },
    amountToRepay: {
        type: Number,
        required: true,
    },
    productId: {
        type: String,
        required: true,
    },
    product: {
        type: Object,
        required: true,
      }
},
{ timestamps: true }
);

export default mongoose.model("Credit", CreditSchema);