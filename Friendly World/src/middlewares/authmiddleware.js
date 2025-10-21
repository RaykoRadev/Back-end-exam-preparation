import { AUTH_COOKIE_NAME, JWT_SECRET } from "../config/constants.js";
import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {
    const token = req.cookies[AUTH_COOKIE_NAME];

    if (!token) {
        return next();
    }

    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);
        req.user = decodedToken;
        req.isAuthenticated = true;

        res.locals.user = decodedToken;
        res.locals.isAuthenticated = true;

        return next();
    } catch (err) {
        res.clearCookie(AUTH_COOKIE_NAME);
        res.redirect("/users/login");
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
