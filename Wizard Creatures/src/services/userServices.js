import Auth from "../model/Auth.js";
import genereteToken from "../utils/generateToken.js";

export default {
    async register(userData) {
        const user = await Auth.findOne({ email: userData.email });
        if (user) {
            throw new Error("User already exists!");
        }
        if (userData.password !== userData.rePassword) {
            throw new Error("Passwords dont match!");
        }
        const newUser = await Auth.create(userData);
        const token = genereteToken(newUser);
        return token;
    },
};
