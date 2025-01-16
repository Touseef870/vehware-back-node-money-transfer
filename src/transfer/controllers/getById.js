import Response from '../../../class/response.js';
import getDataById from '../services/getbyId.js';
import transfer_model from '../models/index.js';

const getByIdController = async (req, res) => {
    const response = new Response(res);

    const { id } = req.params;

    if (!id) {
        return response.error([], "please provide tracking id");
    }

    try {

        const isExist = await transfer_model.findOne({ paymentTrackingId: id });
        if (!isExist) {
            return response.error([], "Data not found, please provide a valid tracking id");
        }

        const data = await getDataById(id);

        let get_transfer_data = {
            _id: data._id,
            paymentTrackingId: data.paymentTrackingId,
            sender: {
                name: data.sender.name,
                email: data.sender.email,
                number: data.sender.number,
                address: data.sender.address,
                country: data.sender.country
            },
            cashAmount: data.cashAmount,
            purposeOfTransfer: data.purposeOfTransfer,
            paymentLocation: data.paymentLocation,
            receiver: {
                name: data.receiver.name,
                email: data.receiver.email,
                number: data.receiver.number,
                address: data.receiver.address,
                country: data.receiver.country
            },
            createdAt: data.createdAt,
            updatedAt: data.updatedAt
        }

        return response.success(get_transfer_data);
    } catch (error) {

        let messages = [];
        if (error.errors) {
            for (let field in error.errors) {
                messages.push(error.errors[field].message);
            }
        } else {
            messages.push(error.message);
        }

        response.error(messages, "Failed to fetch data");
    }
}

export default getByIdController;