import Response from '../../../class/response.js';
import postData from "../services/post.js"
import { generateTrackingId } from "../../../utils/index.js";


const postController = async (req, res) => {
    const response = new Response(res);

    let create_transfer = {};

    create_transfer.sender = {
        name: req.body.sender.name,
        email: req.body.sender.email,
        number: req.body.sender.number,
        address: req.body.sender.address,
        country: req.body.sender.country
    }
    create_transfer.cashAmount = req.body.cashAmount;
    create_transfer.purposeOfTransfer = req.body.purposeOfTransfer;
    create_transfer.paymentLocation = req.body.location;
    create_transfer.receiver = {
        name: req.body.receiver.name,
        email: req.body.receiver.email,
        number: req.body.receiver.number,
        address: req.body.receiver.address,
        country: req.body.receiver.country
    }

    try {

        // Generate paymentTrackingId
        create_transfer.paymentTrackingId = generateTrackingId();

        const data = await postData(create_transfer);

        return response.success(data, 'Data fetched successfully');
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

export default postController;