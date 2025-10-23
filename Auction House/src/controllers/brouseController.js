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
        res.redirect("/offers");
    } catch (err) {
        res.render("auctions/publish", {
            error: getErrorMessage(err),
            data: auctionData,
        });
    }
});

brouseController.get("/details/:auctId", async (req, res) => {
    const userId = req.user?.id;
    const auctId = req.params.auctId;

    const data = await auctionService.getOne(auctId, userId);

    res.render("auctions/details", { data });
});

brouseController.post("/details/:auctId", async (req, res) => {
    const userId = req.user?.id;
    const auctId = req.params.auctId;
    const bid = req.body.bid;

    try {
        const { item } = await auctionService.getOne(auctId, userId);
        if (bid) {
            // if (isOwner) {
            //     throw new Error("The owner can not bid!");
            // }

            if (Number(bid) <= item.price) {
                res.locals.error = "The bid must be higher than the price!";
            } else {
                const username = `${req.user.firstName} ${req.user.lastName}`;
                await auctionService.updateBid(auctId, bid, userId, username);
            }
        }

        // const data = await auctionService.getOne(auctId, userId, bid);
        res.redirect(`/offers/details/${auctId}`);
    } catch (err) {
        (res.locals.error = getErrorMessage(err)),
            res.redirect(`/offers/details/${auctId}`);
    }
});

brouseController.get("/edit/:auctId", isAuth, async (req, res) => {
    const userId = req.user?.id;
    const auctId = req.params.auctId;

    try {
        const { item } = await auctionService.getOne(auctId);
        if (!item.author.equals(userId)) {
            return res.redirect("/offers");
        }

        let isBided = false;
        if (item.bidder.length > 0) {
            isBided = true;
        }

        res.render("auctions/edit", { data: item, isBided });
    } catch (err) {
        res.render("auctions/edit", {
            error: getErrorMessage(err),
        });
    }
});

brouseController.post("/edit/:auctId", isAuth, async (req, res) => {
    const userId = req.user?.id;
    const auctId = req.params.auctId;
    const auctionData = req.body;

    try {
        await auctionService.edit(auctId, auctionData);
        res.redirect(`/offers/details/${auctId}`);
    } catch (err) {
        res.render("auctions/edit", {
            error: getErrorMessage(err),
            data: auctionData,
        });
    }
});
export default brouseController;
