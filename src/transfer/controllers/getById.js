import Response from '../../../class/response.js';
import getDataById from '../services/getbyId.js';

const getByIdController = async (req, res) => {
    const response = new Response(res);

    const { id } = req.params;

    if (!id) {
        return response.error([], "please provide tracking id");
    }

    try {

        const data = await getDataById(id);
        if (!data) {
            return response.error([], "Data not found, please provide a valid tracking id");
        }

        let get_transfer_data = {
            _id: data._id,
            paymentTrackingId: data.paymentTrackingId,
            sender: {
                name: data.sender.name,
                email: data.sender.email,
                number: data.sender.number,
                address: data.sender.address,
                country: data.sender.country,
                _id: data.sender._id
            },
            cashAmount: data.cashAmount,
            purposeOfTransfer: data.purposeOfTransfer,
            paymentLocation: data.currentLocation,
            receiver: {
                name: data.receiver.name,
                email: data.receiver.email,
                number: data.receiver.number,
                address: data.receiver.address,
                country: data.receiver.country,
                _id: data.receiver._id
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