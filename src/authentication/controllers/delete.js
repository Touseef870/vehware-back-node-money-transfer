import Response from '../../../class/response.js';
import deleteData from '../services/delete.js';
import deCodeVerifiedToken from '../../../utils/playWithToken.js';

const deleteController = async (req, res) => {

    const token = req.headers.authorization.split(' ')[1];
    let { _id } = deCodeVerifiedToken(token)

    const response = new Response(res);

    try {

        await deleteData(_id);

        return response.success({id: _id}, 'Data Deleted successfully');
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

export default deleteController;