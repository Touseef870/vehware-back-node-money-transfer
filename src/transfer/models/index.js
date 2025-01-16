import { Schema, model } from 'mongoose';

const transferSchema = new Schema(
    {
        sender: {
            name: {
                type: String,
                required: [true, 'Please provide sender name']
            },
            email: {
                type: String,
                required: true,
                match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please provide a valid email address']
            },
            number: {
                type: String,
                required: [true, 'Please provide sender number']
            },
            address: {
                type: String,
                required: [true, 'Please provide sender address']
            },
            country: {
                type: String,
                required: [true, 'Please provide sender country']
            },
        },
        cashAmount: {
            type: Number,
            required: [true, 'Please provide amount to transfer']
        },
        purposeOfTransfer: {
            type: String,
            required: [true, 'Please provide purpose of transfer'],
            default: 'Miscellaneous'
        },
        paymentTrackingId: {
            type: String,
            required: [true, 'TrackingId is missing']
        },
        paymentLocation: {
            type: String,
            required: [true, 'Please provide payment location']
        },
        receiver: {
            name: {
                type: String,
                required: [true, 'Please provide receiver name']
            },
            email: {
                type: String,
                required: true,
                match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please provide a valid email address']
            },
            number: {
                type: String,
                required: [true, 'Please provide receiver number']
            },
            address: {
                type: String,
                required: [true, 'Please provide receiver address']
            },
            country: {
                type: String,
                required: [true, 'Please provide receiver country']
            },
        },
    },
    {
        timestamps: true,
    }
);

const transfer_model = model('Transfer', transferSchema);

export default transfer_model;
