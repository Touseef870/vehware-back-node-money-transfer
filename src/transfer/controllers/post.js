import Response from '../../../class/response.js';
import postData from "../services/post.js"
import { generateTrackingId, receiverUniqueID, sendEmail } from "../../../utils/index.js";
import { generateReceiverEmail, generateSenderEmail } from "../../../email template/index.js"


const postController = async (req, res) => {
    const response = new Response(res);

    let create_transfer = {};

    create_transfer.sender = {
        name: req.body.senderName,
        email: req.body.senderEmail,
        number: req.body.senderNumber,
        address: req.body.senderAddress,
        country: req.body.senderCountry
    }
    create_transfer.cashAmount = req.body.cashAmount;
    create_transfer.purposeOfTransfer = req.body.purposeOfTransfer;
    create_transfer.currentLocation = req.body.location;
    create_transfer.receiver = {
        name: req.body.receiverName,
        email: req.body.receiverEmail,
        number: req.body.receiverNumber,
        address: req.body.receiverAddress,
        country: req.body.receiverCountry
    }

    try {

        // Generate paymentTrackingId
        create_transfer.paymentTrackingId = generateTrackingId();
        create_transfer.sender.uniqueSenderId = receiverUniqueID(create_transfer.sender);
        create_transfer.receiver.uniqueReceiverId = receiverUniqueID(create_transfer.receiver);


        const data = await postData(create_transfer);

        const sentSenderEmail = await sendEmail({ data, customerEmail: data.sender.email, template: generateSenderEmail })
            .then(() => {
                console.log("Email sent successfully");
            })
            .catch((error) => {
                console.error("Error sending email:", error.message);
                response.error({}, 'Failed to send sender email');
            });

        const sentReceiverEmail = await sendEmail({ data, customerEmail: data.receiver.email, template: generateReceiverEmail })
            .then(() => {
                console.log("Email sent successfully");
            })
            .catch((error) => {
                console.error("Error sending email:", error.message);
                response.error({}, 'Failed to send receiver email');
            });


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

        return response.error(messages, "Failed to fetch data");
    }
}

export default postController;