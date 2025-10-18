import { Router } from "express";

const userController = Router();

userController.get("/register", (req, res) => {
    res.render("auth/register");
});

export default userController;
