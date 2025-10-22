import { Router } from "express";

const catalogController = Router();

catalogController.get("/", async (req, res) => {
    res.render("catalog/catalog");
});

catalogController.get("/create", (req, res) => {
    res.render("catalog/create");
});

catalogController.get("/create", async (req, res) => {
    res.render("catalog/create");
});

export default catalogController;
