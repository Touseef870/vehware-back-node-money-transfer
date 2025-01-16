import { getById } from "../db/index.js";

const updateData = async (id, data) => {
    return await getById(id, data);
}

export default updateData;