import { Router } from "express";

const brouseController = Router();

brouseController.get("/", (req, res) => {
    res.render("auctions/browse");
});

export default brouseController;
