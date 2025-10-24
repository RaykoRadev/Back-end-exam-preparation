import { Router } from "express";
import { isAuth } from "../middlewares/authmiddleware.js";
import { getErrorMessage } from "../utils/errorUtils.js";
import { artService } from "../services/index.js";

const artController = Router();

artController.get("/", async (req, res) => {
    const arts = await artService.getAll();
    res.render("art/gallery", { arts });
});

artController.get("/create", isAuth, (req, res) => {
    res.render("art/create");
});

artController.post("/create", isAuth, async (req, res) => {
    const art = req.body;
    const userId = req.user.id;
    try {
        await artService.create(art, userId);
        res.render("art/gallery");
    } catch (err) {
        res.render("art/create", { art, error: getErrorMessage(err) });
    }
});

artController.get("/details/:artId", async (req, res) => {
    const artId = req.params.artId;
    const userId = req.user.id;

    const result = await artService.getOne(artId, userId);
    res.render("art/details", { result });
});

artController.get("/share/:artId", isAuth, async (req, res) => {
    const artId = req.params.artId;
    const userId = req.user.id;

    await artService.share(artId, userId);
    res.redirect("/");
});

artController.get("/edit/:artId", isAuth, async (req, res) => {
    const artId = req.params.artId;
    const userId = req.user.id;

    const { art, isAuthor } = await artService.getOne(artId, userId);

    if (!isAuthor) {
        throw {
            statusCode: 401,
            message: "Only the author can edit!",
        };
    }
    res.render("art/edit", { art });
});

artController.post("/edit/:artId", isAuth, async (req, res) => {
    const artId = req.params.artId;
    const art = req.body;

    try {
        await artService.edit(artId, art);
        res.redirect(`/art/details/${artId}`);
    } catch (err) {
        res.render("art/edit", { art, error: getErrorMessage(err) });
    }
});

export default artController;
