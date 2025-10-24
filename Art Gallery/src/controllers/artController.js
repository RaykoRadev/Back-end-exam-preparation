import { Router } from "express";

const artController = Router();

artController.get("/", async (req, res) => {
    res.render("art/gallery");
});

export default artController;
