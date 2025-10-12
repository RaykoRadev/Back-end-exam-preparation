import User from "../models/User.js";

export default {
    regisrer(data) {
        return User.create(data);
    },

    find(email) {
        return User.findOne({ email });
    },
};
