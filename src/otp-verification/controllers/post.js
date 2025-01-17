import Response from '../../../class/response.js';
import transfer_model from "../../transfer/models/index.js";
import { generateOTP, sendEmail } from "../../../utils/index.js";
import { generateOTPTemplate, generateReceiverTemplate, generateSenderNotification } from "../../../email template/index.js"

const postController = async (req, res) => {
    const response = new Response(res);

    const { receiverId, email, verifyOtp } = req.body;

    if (verifyOtp) {

        const isOtpMatched = await transfer_model.findOne({ otp: verifyOtp })

        if (!isOtpMatched) {
            return response.error({}, 'Invalid OTP');
        }

        if(isOtpMatched.status === "Completed"){
            return response.error({}, 'OTP already used');
        }

        let data = {
            receiver: isOtpMatched.receiver,
            sender: isOtpMatched.sender,
            amount: isOtpMatched.cashAmount
        }

        const receiverNotificationEmail = await sendEmail({ data, customerEmail: isOtpMatched.receiver.email, template: generateReceiverTemplate })
            .then(() => {
                console.log("Email sent successfully");
            })
            .catch((error) => {
                console.error("Error sending email:", error.message);
                response.error({}, 'Failed to send sender email');
            });

        const senderNotificationEmail = await sendEmail({ data, customerEmail: isOtpMatched.sender.email, template: generateSenderNotification })
            .then(() => {
                console.log("Email sent successfully");
            })
            .catch((error) => {
                console.error("Error sending email:", error.message);
                response.error({}, 'Failed to send sender email');
            });


        const updateOtp = await transfer_model.findByIdAndUpdate(
            { _id: isOtpMatched._id },
            { status: "Completed" },
            { new: true }
        )

        return response.success(updateOtp.otp, 'Data fetched successfully');
    }

    if (!receiverId || !email) {
        return response.error({}, 'Receiver ID and email are required');
    }

    const verify_user = {
        receiver: {
            _id: receiverId,
            email: email,
        },
    };

    try {
        const user = await transfer_model.findOne({
            "receiver.uniqueReceiverId": verify_user.receiver._id,
            "receiver.email": verify_user.receiver.email,
        });

        if (!user) {
            return response.error({}, 'User not found');
        }

        // Generate OTP
        const otp = generateOTP(user._doc.receiver._id);

        const updatedUser = await transfer_model.findByIdAndUpdate(
            user._id,
            { otp: otp },
            { new: true }
        );

        if (!updatedUser) {
            return response.error({}, 'Failed to update OTP');
        }

        const sentOtpToReceiver = await sendEmail({ data: otp, customerEmail: user.receiver.email, template: generateOTPTemplate })
            .then(() => {
                console.log("Email sent successfully");
            })
            .catch((error) => {
                console.error("Error sending email:", error.message);
                response.error({}, 'Failed to send sender email');
            });

        return response.success(updatedUser, 'Data fetched successfully');
    } catch (err) {
        console.error('Error during OTP generation or update:', err);
        return response.error({}, 'Failed to process request');
    }
}

export default postController;
