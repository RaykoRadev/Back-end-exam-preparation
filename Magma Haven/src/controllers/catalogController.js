import { Router } from "express";
import { isAuth, isGuest } from "../middlewares/authentication.js";

const catalogController = Router();

catalogController.get("/create", isAuth, (req, res) => {
    res.render("catalog/create");
});

catalogController.post("/create", isAuth, (req, res) => {
    const data = req.body;

    try {
    } catch (err) {
        res.render("catalog/create", {
            error: getErrorMessage(err),
            catalog: data,
        });
    }
});

export default catalogController;
