import { Router } from "express";
import getErrorMessage from "../utils/errorhandler.js";
import userServices from "../services/userServices.js";
import { isAuth, isGuest } from "../middlewares/isitAuth.js";

const userController = Router();

userController.get("/register", isGuest, (req, res) => {
    res.render("auth/register");
});

userController.post("/register", isGuest, async (req, res) => {
    const userData = req.body;
    try {
        const token = await userServices.register(userData);
        res.cookie("auth", token);
        res.redirect("/");
    } catch (err) {
        res.render("auth/register", {
            error: getErrorMessage(err),
            user: userData,
        });
    }
});

userController.get("/login", isGuest, (req, res) => {
    res.render("auth/login");
});

userController.post("/login", isGuest, async (req, res) => {
    const userData = req.body;
    try {
        const token = await userServices.login(userData);
        res.cookie("auth", token);
        res.redirect("/");
    } catch (err) {
        res.render("auth/login", {
            error: getErrorMessage(err),
            user: userData,
        });
    }
});

userController.get("/logout", isAuth, (req, res) => {
    res.clearCookie("auth");
    res.redirect("/");
});

export default userController;
