import { Router } from "express";
import getErrorMessage from "../utils/errorhandler.js";
import userServices from "../services/userServices.js";

const userController = Router();

userController.get("/register", (req, res) => {
    res.render("auth/register");
});

userController.post("/register", async (req, res) => {
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

userController.get("/logout", (req, res) => {
    res.clearCookie("auth");
    res.redirect("/");
});

export default userController;
