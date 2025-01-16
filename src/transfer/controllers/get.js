import Response from '../../../class/response.js';
import getData from '../services/get.js';

const getController = async (req, res) => {
    const response = new Response(res);

    try {

        const data = await getData();

        const get_transfer_data = data.map((transfer) => {
            return {
                _id: transfer._id,
                paymentTrackingId: transfer.paymentTrackingId,
                sender: {
                    name: transfer.sender.name,
                    email: transfer.sender.email,
                    number: transfer.sender.number,
                    address: transfer.sender.address,
                    country: transfer.sender.country
                },
                cashAmount: transfer.cashAmount,
                purposeOfTransfer: transfer.purposeOfTransfer,
                paymentLocation: transfer.paymentLocation,
                receiver: {
                    name: transfer.receiver.name,
                    email: transfer.receiver.email,
                    number: transfer.receiver.number,
                    address: transfer.receiver.address,
                    country: transfer.receiver.country
                },
                createdAt: transfer.createdAt,
                updatedAt: transfer.updatedAt
            }
        });

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

export default getController;