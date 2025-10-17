import User from "../models/User.js";

export default {
    async register(data) {
        return User.create(data);
    },
};
