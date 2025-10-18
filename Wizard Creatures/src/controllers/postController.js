import { Router } from "express";
import postService from "../services/postService.js";
import getErrorMessage from "../utils/errorhandler.js";

const postController = Router();

postController.get("/", async (req, res) => {
    const postArr = await postService.getAll();
    res.render("posts/all-posts", { post: postArr });
});

postController.get("/create", (req, res) => {
    res.render("posts/create");
});

postController.post("/create", (req, res) => {
    const postData = req.body;
    try {
        res.redirect("/creatures");
    } catch (err) {
        res.render("posts/create", {
            error: getErrorMessage(err),
            post: postData,
        });
    }
    res.render("posts/create");
});

export default postController;
