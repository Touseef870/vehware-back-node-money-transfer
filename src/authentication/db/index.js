import Model from "../models/index.js";

const getAll = async () => await Model.find();

const addData = async (data) => {
    const existingUser = await Model.findOne({ email: data.email });
    if (existingUser) {
        throw new Error("Email is already registered");
    }

    return new Model(data).save().then((user) => user.toObject());
}

const getData = async (data) => {
    const { email, password } = data;

    const user = await Model.findOne({ email });
    if (!user) {
        throw new Error("User not found");
    }

    const isMatch = await user.isPasswordValid(password);
    if (!isMatch) {
        throw new Error("Password is incorrect");
    }

    const userData = user.toObject();
    delete userData.password;
    delete userData.__v;

    return userData;
}

const deleteById = async (id) => {
    const deletedUser = await Model.findByIdAndDelete(id);
    if (!deletedUser) {
        throw new Error("User not found");
    }
    return deletedUser;
};

const updateById = async (id, data) => {
    const updatedUser = await Model.findByIdAndUpdate(id, data, { new: true });
    if (!updatedUser) {
        throw new Error("User not found");
    }

    delete updatedUser._doc.password;
    delete updatedUser._doc.__v;

    return updatedUser;
}

const getById = async (id) => {
    const user = await Model.findById({ _id: id });
    if (!user) {
        throw new Error("User not found");
    }

    delete user._doc.password;
    delete user._doc.__v;

    return user;
};


export {
    getAll,
    addData,
    deleteById,
    updateById,
    getById,
    getData
}