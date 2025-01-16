import { Schema, model } from 'mongoose';

const transferSchema = new Schema(
    {
        sender: {
            name: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true,
                match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please provide a valid email address']
            },
            number: {
                type: String,
                required: true
            },
            address: {
                type: String,
                required: true
            },
            country: {
                type: String,
                required: true
            },
        },
        cashAmount: {
            type: Number,
            required: true
        },
        purposeOfTransfer: {
            type: String,
            required: true
        },
        paymentTracking: {
            type: String,
            required: true
        },
        receiver: {
            name: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true,
                match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please provide a valid email address']
            },
            number: {
                type: String,
                required: true
            },
            address: {
                type: String,
                required: true
            },
            country: {
                type: String,
                required: true
            },
        },
    },
    {
        timestamps: true,
    }
);

const transfer_model = model('Transfer', transferSchema);

export default transfer_model;
