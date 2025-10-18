import { Router } from "express";
import postService from "../services/postService.js";

const postController = Router();

postController.get("/", async (req, res) => {
    const postArr = await postService.getAll();
    res.render("posts/all-posts", { post: postArr });
});

export default postController;
