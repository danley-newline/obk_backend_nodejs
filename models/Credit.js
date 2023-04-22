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
    statut: {
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
      }
},
{ timestamps: true }
);

export default mongoose.model("Credit", CreditSchema);