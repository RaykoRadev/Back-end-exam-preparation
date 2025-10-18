import { Router } from "express";
import postService from "../services/postService.js";
import getErrorMessage from "../utils/errorhandler.js";
import { isAuth } from "../middlewares/isitAuth.js";
import { isOwnerF } from "../middlewares/checkOwner.js";

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

postController.get("/details/:postId", async (req, res) => {
    const postId = req.params.postId;
    const userId = req.user?.id;
    const userEmail = req.user.email;

    try {
        const { post, isOwner, countVotes, voted, emails } =
            await postService.getOne(postId, userId, userEmail);

        res.render("posts/details", {
            post,
            isOwner,
            countVotes,
            voted,
            emails,
        });
    } catch (err) {
        res.render("posts/details", {
            error: getErrorMessage(err),
        });
    }
});

postController.get("/edit/:postId", isAuth, isOwnerF, (req, res) => {
    const post = req.post;
    res.render("posts/edit", { post });
});

postController.post("/edit/:postId", isAuth, async (req, res) => {
    const postData = req.body;
    const postId = req.params.postId;

    try {
        const post = await postService.edit(postId, postData);
        res.redirect(`/creatures/details/${postId}`);
    } catch (err) {
        res.render("posts/edit", {
            error: getErrorMessage(err),
            post: postData,
        });
    }
});

postController.get("/vote/:postId", isAuth, async (req, res) => {
    const postId = req.params.postId;
    const userId = req.user?.id;
    try {
        await postService.vote(postId, userId);
        res.redirect(`/creatures/details/${postId}`);
    } catch (err) {
        res.render("posts/details", {
            error: getErrorMessage(err),
        });
    }
});

postController.get("/delete/:postId", isAuth, async (req, res) => {
    const postId = req.params.postId;
    const userId = req.user?.id;
    await postService.delete(postId, userId);
    res.redirect("/creatures");
});

export default postController;
