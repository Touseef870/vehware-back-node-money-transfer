import Response from '../../../class/response.js';
import login from '../services/get.js';
import generateToken from '../../../utils/generateToken.js';

const getController = async (req, res) => {
    const response = new Response(res);

    let user_login = {};
    user_login.email = req.body.email;
    user_login.password = req.body.password;

    try {
        const data = await login(user_login);

        const token = generateToken(data);

        res.cookie("authToken", token, { httpOnly: true });

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

export default getController;