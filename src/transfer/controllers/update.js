import Response from '../../../class/response.js';
import updateData from "../services/update.js";
import { flattenObject } from "../../../utils/index.js";

const updateController = async (req, res) => {
    const response = new Response(res);

    const { id } = req.params;

    try {

        if (req.body.paymentTrackingId) {
            return response.error({}, "You cannot update the paymentTrackingId.");
        }

        if (!req.body || Object.keys(req.body).length === 0) {
            return response.error([], "Please provide data to update.");
        }

        const flattenedData = flattenObject(req.body);

        const updatedData = await updateData(id, flattenedData);

        if (!updatedData) {
            return response.error([], "No document found to update.");
        }

        return response.success(updatedData, "Update successful.");
    } catch (err) {
        console.error("Update error:", err);
        return response.error({}, "An error occurred while updating.");
    }
};

export default updateController;
