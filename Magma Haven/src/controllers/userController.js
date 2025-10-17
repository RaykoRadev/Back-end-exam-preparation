import { Router } from "express";

import userService from "../services/userService.js";
import getErrorMessage from "../utils/errorHandler.js";

const userController = Router();

userController.get("/register", (req, res) => {
    res.render("auth/register");
});

userController.post("/register", async (req, res) => {
    const userData = req.body;

    try {
        const user = await userService.register(userData);
        res.redirect("/");
    } catch (err) {
        console.log(err);
        res.render("auth/register", {
            error: getErrorMessage(err),
            user: userData,
        });
    }
});

export default userController;
