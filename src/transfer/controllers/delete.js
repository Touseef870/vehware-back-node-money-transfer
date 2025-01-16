import Response from '../../../class/response.js';
import transfer_model from '../models/index.js';
import deleteData from '../services/delete.js';

const deleteController = async (req, res) => {
    const response = new Response(res);


    const { id } = req.params;

    try {

        const isExists = await transfer_model.findById(id);
        if (!isExists) {
            return response.error({}, "No document found to delete.");
        }


        const data = await deleteData(id);
        return response.success({ user: id }, 'Data fetched successfully');
    } catch (err) {
        response.error({}, 'Failed to fetch data');
    }
}

export default deleteController;