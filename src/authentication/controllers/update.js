import Response from '../../../class/response.js';
import updateData from '../services/update.js';
import deCodeVerifiedToken from '../../../utils/playWithToken.js';

const updateController = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    let { _id } = deCodeVerifiedToken(token)

    const response = new Response(res);

    try {

        const data = await updateData(_id, req.body);

        return response.success(data, 'Data Updated successfully');
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

export default updateController;