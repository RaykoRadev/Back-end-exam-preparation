import { animalService } from "../services/index.js";
import { getErrorMessage } from "../utils/errorUtils.js";

export default async function isOwnerF(req, res, next) {
    const anmlId = req.params.animlId;
    const userId = req.user?.id;
    try {
        const { animal, isOwner } = await animalService.getOne(anmlId, userId);

        if (!isOwner) {
            return res.redirect("/animals");
        }

        req.animal = animal;
        next();
    } catch (err) {
        return res.status(404).render("animals/dashboard", {
            error: getErrorMessage(err),
        });
    }
}
