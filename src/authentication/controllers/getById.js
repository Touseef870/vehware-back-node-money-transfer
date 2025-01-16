import Response from '../../../class/response.js';
import getDataById from '../services/getbyId.js';

const getByIdController = async (req, res) => {
    const response = new Response(res);

    const { id } = req.params;

    try {
        const data = await getDataById(id);

        return response.success(data);
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