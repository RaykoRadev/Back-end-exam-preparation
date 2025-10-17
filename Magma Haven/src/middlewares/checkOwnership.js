import catalogService from "../services/catalogService.js";
import getErrorMessage from "../utils/errorHandler.js";

export async function isOwner(req, res, next) {
    const volcanoId = req.params.volcanoId;
    const userId = req.user?.id;
    try {
        const volcano = await catalogService.getOne(volcanoId);
        const isOwner = userId == volcano.owner;

        if (isOwner) {
            req.volcano = volcano;
            return next();
        } else {
            res.render("catalog/catalog");
            return next();
        }
    } catch (err) {
        res.render("catalog/catalog", {
            error: getErrorMessage(err),
        });
    }
}
