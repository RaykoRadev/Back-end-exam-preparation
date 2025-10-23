import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/constants.js";

export function generateAuthToken(user) {
    //todo check what has to be in the payload
    const payload = {
        email: user.email,
        username: user.username,
        id: user.id,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "2h" });

    return token;
}
