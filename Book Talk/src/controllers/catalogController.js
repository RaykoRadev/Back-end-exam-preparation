import { Router } from "express";
import { catalogService } from "../services/index.js";
import { isAuth } from "../middlewares/authmiddleware.js";
import { getErrorMessage } from "../utils/errorUtils.js";

const catalogController = Router();

catalogController.get("/", async (req, res) => {
    try {
        const reviews = await catalogService.getAll();
        res.render("catalog/catalog", { reviews });
    } catch (err) {
        return res.status(404).render("catalog/catalog", {
            error: getErrorMessage(err),
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
        const newReview = await catalogService.create(data, userId);
        res.redirect("/catalog");
    } catch (err) {
        return res.status(404).render("catalog/create", {
            error: getErrorMessage(err),
            catalog: data,
        });
    }
});

catalogController.get("/details/:reviewId", async (req, res) => {
    const reviewId = req.params.reviewId;
    const userId = req.user?.id;

    try {
        const data = await catalogService.getOne(reviewId, userId);
        res.render("catalog/details", { data });
    } catch (err) {
        return res.status(404).render("catalog/catalog", {
            error: getErrorMessage(err),
        });
    }
});

catalogController.get("/wish/:reviewId", isAuth, async (req, res) => {
    const reviewId = req.params.reviewId;
    const userId = req.user?.id;

    try {
        await catalogService.addWish(reviewId, userId);
        res.redirect(`/catalog/details/${reviewId}`);
    } catch (err) {
        return res.status(404).render("catalog/catalog", {
            error: getErrorMessage(err),
        });
    }
});

export default catalogController;
