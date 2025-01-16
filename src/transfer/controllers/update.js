import Response from '../../../class/response.js';
import updateData from "../services/update.js"

const updateController = async (req, res) => {
    const response = new Response(res);

    const { id } = req.params

    try {

        const data = await updateData(id, req.body);

        return response.success(data);
    } catch (err) {
        response.error({});
    }
}

export default updateController;