import { Router } from "express";

const userController = Router();

userController.get("/register", (req, res) => {
    res.render("auth/register");
});

userController.post("/register", async (req, res) => {
    const userData = req.body;
    console.log(userData);
    res.render("auth/register", { user: userData });
});

export default userController;
