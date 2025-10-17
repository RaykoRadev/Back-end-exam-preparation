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
        const errorMessage = "Session expired!";
        res.clearCookie("auth");
        return res.redirect("/users/login");
    }
}

export function isAuth(req, res, next) {
    if (!req.isAuthenticated) {
        return res.redirect("/users/login");
    }
    next();
}

export function isGuest(req, res, next) {
    if (req.isAuthenticated) {
        return res.redirect("/");
    }
    next();
}
