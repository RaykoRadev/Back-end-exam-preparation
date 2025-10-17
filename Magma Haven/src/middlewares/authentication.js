import jwt from "jsonwebtoken";

import getErrorMessage from "../utils/errorHandler.js";
import { JWT_SECRET } from "../config/constants.js";

export default function checkAuth(req, res, next) {
    const token = req.cookies["auth"];

    if (!token) {
        return next();
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        req.user = decoded;
        req.isAuthenticated = true;

        res.locals.user = decoded;
        res.locals.isAuthenticated = true;

        return next();
    } catch (err) {
        res.clearCookie("auth");
        res.redirect("/users/login");
        return getErrorMessage(err);
    }
}
