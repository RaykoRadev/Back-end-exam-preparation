import Catalog from "../models/Catalog.js";

export default {
    create(data, userId) {
        return Catalog.create({ ...data, owner: userId });
    },
};
