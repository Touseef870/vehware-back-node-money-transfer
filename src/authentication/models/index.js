import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const dataSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
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
}, { timestamps: true });

dataSchema.pre("save", function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

dataSchema.methods.isPasswordValid = async function (plainPassword) {
    return await bcrypt.compare(plainPassword, this.password);
};

const Model = mongoose.model("User", dataSchema);

export default Model;