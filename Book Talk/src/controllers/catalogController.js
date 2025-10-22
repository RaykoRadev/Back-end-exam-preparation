import { Router } from "express";
import { catalogService } from "../services/index.js";
import { isAuth } from "../middlewares/authmiddleware.js";
import { getErrorMessage } from "../utils/errorUtils.js";

const catalogController = Router();

catalogController.get("/", async (req, res) => {
    res.render("catalog/catalog");
});

catalogController.get("/create", isAuth, (req, res) => {
    res.render("catalog/create");
});

catalogController.post("/create", isAuth, async (req, res) => {
    const data = req.body;
    const userId = req.user.id;

    try {
        const newReview = await catalogService.create(data, userId);
        res.redirect("/catalog");
    } catch (err) {
        return res.status(404).render("catalog/create", {
            error: getErrorMessage(err),
            catalog: data,
        });
    }
});

export default catalogController;
