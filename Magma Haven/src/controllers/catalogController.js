import { Router } from "express";
import { isAuth, isGuest } from "../middlewares/authentication.js";
import catalogService from "../services/catalogService.js";
import getErrorMessage from "../utils/errorHandler.js";

const catalogController = Router();

catalogController.get("/", async (req, res) => {
    try {
        const volcanos = await catalogService.getAll();
        res.render("catalog/catalog", { volcanos });
    } catch (err) {
        res.render("catalog/create", {
            error: getErrorMessage(err),
            catalog: data,
        });
    }
});

catalogController.get("/create", isAuth, (req, res) => {
    res.render("catalog/create");
});

catalogController.post("/create", isAuth, async (req, res) => {
    const data = req.body;
    const userId = req.user.id;

    try {
        const item = await catalogService.create(data, userId);
        res.status(201).redirect("/catalog");
    } catch (err) {
        res.render("catalog/create", {
            error: getErrorMessage(err),
            catalog: data,
        });
    }
});

export default catalogController;
