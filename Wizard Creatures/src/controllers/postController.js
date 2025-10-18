import { Router } from "express";
import postService from "../services/postService.js";
import getErrorMessage from "../utils/errorhandler.js";
import { isAuth } from "../middlewares/isitAuth.js";

const postController = Router();

postController.get("/", async (req, res) => {
    const postArr = await postService.getAll();
    res.render("posts/all-posts", { post: postArr });
});

postController.get("/create", isAuth, (req, res) => {
    res.render("posts/create");
});

postController.post("/create", isAuth, async (req, res) => {
    const postData = req.body;
    const userId = req.user.id;
    console.log(postData);
    try {
        const post = await postService.create(postData, userId);
        res.redirect("/creatures");
    } catch (err) {
        res.render("posts/create", {
            error: getErrorMessage(err),
            post: postData,
        });
    }
});

export default postController;
