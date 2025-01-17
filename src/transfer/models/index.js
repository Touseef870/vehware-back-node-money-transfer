// import { Schema, model } from 'mongoose';

// const transferSchema = new Schema(
//     {
//         sender: {
//             _id: true,
//             name: {
//                 type: String,
//                 required: [true, 'Please provide sender name']
//             },
//             email: {
//                 type: String,
//                 required: true,
//                 match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please provide a valid email address']
//             },
//             number: {
//                 type: String,
//                 required: [true, 'Please provide sender number']
//             },
//             address: {
//                 type: String,
//                 required: [true, 'Please provide sender address']
//             },
//             country: {
//                 type: String,
//                 required: [true, 'Please provide sender country']
//             },
//         },
//         cashAmount: {
//             type: Number,
//             required: [true, 'Please provide amount to transfer']
//         },
//         purposeOfTransfer: {
//             type: String,
//             required: [true, 'Please provide purpose of transfer'],
//             default: 'Miscellaneous'
//         },
//         paymentTrackingId: {
//             type: String,
//             required: [true, 'TrackingId is missing']
//         },
//         currentLocation: {
//             type: Array,
//             required: [true, 'Please provide payment location'],
//             validate: {
//                 validator: function (v) {
//                     return v.length > 0;
//                 },
//                 message: 'Please provide a valid location'
//             }
//         },
//         status: {
//             type: String,
//             enum: ['Pending', 'Completed', 'Failed'],
//             default: 'Pending'
//         },
//         receiver: {
//             _id: true,
//             name: {
//                 type: String,
//                 required: [true, 'Please provide receiver name']
//             },
//             email: {
//                 type: String,
//                 required: true,
//                 match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please provide a valid email address']
//             },
//             number: {
//                 type: String,
//                 required: [true, 'Please provide receiver number']
//             },
//             address: {
//                 type: String,
//                 required: [true, 'Please provide receiver address']
//             },
//             country: {
//                 type: String,
//                 required: [true, 'Please provide receiver country']
//             },
//         },
//     },
//     {
//         timestamps: true,
//     }
// );

// // [{ type: 'Point', coordinates: [longitude, latitude] }]  // GeoJSON

// const transfer_model = model('Transfer', transferSchema);

// export default transfer_model;



import { Schema, model } from 'mongoose';


const senderSchema = new Schema({
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
    uniqueSenderId: {
        type: String,
        required: [true, 'Please provide receiver uniqueId']
    }
}, { _id: true });


const receiverSchema = new Schema({
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
    uniqueReceiverId: {
        type: String,
        required: [true, 'Please provide receiver uniqueId']
    }
}, { _id: true });


const transferSchema = new Schema(
    {
        sender: senderSchema,
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
        currentLocation: {
            type: Array,
            required: [true, 'Please provide payment location'],
            validate: {
                validator: function (v) {
                    return v.length > 0;
                },
                message: 'Please provide a valid location'
            }
        },
        status: {
            type: String,
            enum: ['Pending', 'Completed', 'Failed'],
            default: 'Pending'
        },
        receiver: receiverSchema,
        otp: {
            type: String,
        }
    },
    {
        timestamps: true
    }
);

const transfer_model = model('Transfer', transferSchema);

export default transfer_model;
