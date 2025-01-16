import Response from '../../../class/response.js';
import Model from '../models/index.js';

const getByIdController = async (req, res) => {
    const response = new Response(res);

    const { id } = req.params;

    try {

        const user = await Model.findById({ _id: id });
        if (!user) {
            return response.error("User not found");
        }

        delete user._doc.password;
        delete user._doc.__v;

        return response.success(user);
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