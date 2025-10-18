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
        await userServices.register(userData);
        console.log(userData);
    } catch (err) {
        res.render("auth/register", {
            error: getErrorMessage(err),
            user: userData,
        });
    }
});

export default userController;
