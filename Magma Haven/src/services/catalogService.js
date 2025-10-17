import Catalog from "../models/Catalog.js";

export default {
    create(data, userId) {
        return Catalog.create({ ...data, owner: userId });
    },

    getAll() {
        return Catalog.find();
    },

    getOne(id) {
        return Catalog.findById(id);
    },

    edit(id, data) {
        return Catalog.findByIdAndUpdate(id, data, { runValidators: true });
    },

    delete(id) {
        return Catalog.findByIdAndDelete(id);
    },
};
