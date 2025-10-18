import { Router } from "express";

const postController = Router();

postController.get("/", async (req, res) => {
    res.render("posts/all-posts");
});

export default postController;
