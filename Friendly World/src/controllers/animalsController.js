import { Router } from "express";

import { animalService } from "../services/index.js";
import { isAuth } from "../middlewares/authmiddleware.js";
import { getErrorMessage } from "../utils/errorUtils.js";
import isOwnerF from "../middlewares/ownersMiddleware.js";

const animalController = Router();

animalController.get("/", async (req, res) => {
    try {
        const animals = await animalService.getAll();
        res.render("animals/dashboard", { animals });
    } catch (err) {
        return res.status(404).render("home", {
            error: getErrorMessage(err),
        });
    }
});

animalController.get("/create", isAuth, (req, res) => {
    res.render("animals/create");
});

animalController.post("/create", isAuth, async (req, res) => {
    const animalData = req.body;
    const owner = req.user.id;
    try {
        const createdAnimal = await animalService.create(animalData, owner);
        res.redirect("/animals");
    } catch (err) {
        return res.status(404).render("animals/create", {
            error: getErrorMessage(err),
            animal: animalData,
        });
    }
});

animalController.get("/details/:anmlId", async (req, res) => {
    const anmlId = req.params.anmlId;
    const userId = req.user?.id;
    try {
        const result = await animalService.getOne(anmlId, userId);
        res.render("animals/details", result);
    } catch (err) {
        return res.status(404).render("animals/dashboard", {
            error: getErrorMessage(err),
        });
    }
});

animalController.get("/donate/:anmlId", isAuth, async (req, res) => {
    const anmlId = req.params.anmlId;
    const userId = req.user?.id;
    try {
        const result = await animalService.donate(anmlId, userId);
        res.redirect(`/animals/details/${anmlId}`);
    } catch (err) {
        return res.status(404).render("animals/dashboard", {
            error: getErrorMessage(err),
        });
    }
});

animalController.get("/edit/:animlId", isAuth, isOwnerF, (req, res) => {
    const animal = req.animal;
    res.render("animals/edit", { animal });
});

animalController.post("/edit/:animlId", isAuth, async (req, res) => {
    const animalData = req.body;
    const animlId = req.params.animlId;
    try {
        const createdAnimal = await animalService.edit(animlId, animalData);
        res.redirect(`/animals/details/${animlId}`);
    } catch (err) {
        return res.status(404).render("animals/edit", {
            error: getErrorMessage(err),
            animal: animalData,
        });
    }
});

animalController.get("/delete/:animlId", isAuth, async (req, res) => {
    const anmlId = req.params.animlId;
    const userId = req.user?.id;
    try {
        await animalService.deleteOne(anmlId, userId);
        res.redirect("/animals");
    } catch (err) {
        return res.status(404).render("animals/dashboard", {
            error: getErrorMessage(err),
        });
    }
});

export default animalController;
