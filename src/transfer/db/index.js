import transfer_model from "../models/index.js";

const getAll = async () => await transfer_model.find();

const addData = (data) => new transfer_model(data).save().then((user) => user.toObject());

const deleteById = async (id) => await transfer_model.findByIdAndDelete(id);

const updateById = async (id, data) => await transfer_model.findByIdAndUpdate(id, { $set: data }, { new: true });

const getById = async (id) => await transfer_model.findOne({paymentTrackingId: id});

export {
    getAll,
    addData,
    deleteById,
    updateById,
    getById
}