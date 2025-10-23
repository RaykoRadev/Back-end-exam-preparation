import { Router } from "express";
import { isAuth } from "../middlewares/authmiddleware.js";
import { getErrorMessage } from "../utils/errorUtils.js";
import { auctionService } from "../services/index.js";

const brouseController = Router();

brouseController.get("/", async (req, res) => {
    const data = await auctionService.getAll();
    res.render("auctions/browse", { data });
});

brouseController.get("/publish", isAuth, (req, res) => {
    res.render("auctions/publish");
});

brouseController.post("/publish", isAuth, async (req, res) => {
    const auctionData = req.body;
    const userId = req.user.id;
    try {
        const offer = await auctionService.create(auctionData, userId);
        res.render("auctions/browse");
    } catch (err) {
        res.render("auctions/publish", {
            error: getErrorMessage(err),
            data: auctionData,
        });
    }
});

export default brouseController;
