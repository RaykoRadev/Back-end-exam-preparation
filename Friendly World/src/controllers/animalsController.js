import { Router } from "express";

const animalController = Router();

animalController.get("/", (req, res) => {
    res.render("animals/dashboard");
});

export default animalController;
