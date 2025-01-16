import Response from '../../../class/response.js';
import deleteData from '../services/delete.js';
import deCodeVerifiedToken from '../../../utils/playWithToken.js';

const deleteController = async (req, res) => {
    const response = new Response(res);

    const { id } = req.params;

    try {
        const data = await deleteData(id);
        return response.success({ key: 'value' }, 'Data fetched successfully');
    } catch (err) {
        response.error({}, 'Failed to fetch data');
    }
}

export default deleteController;